import { EventEmitter } from 'events';
import { IDispatcherEvent } from './interfaces/event.interface';
import { IDispatcherListener } from './interfaces/listener.interface';

/* It's a class that allows you to register events and listeners, and then fire them */
export class DispatcherEngine extends EventEmitter {
  private _events: IDispatcherEvent[] = [];

  /**
   * It adds an event to the _events array
   * @param {IDispatcherEvent} event - IDispatcherEvent - The event to be added to the queue.
   * @returns The DispatcherEngine instance.
   */
  public setEvent(event: IDispatcherEvent): DispatcherEngine {
    this._events.push(event);
    return this;
  }

  /**
   * This function takes an array of IDispatcherEvent objects and calls the setEvent function for each
   * one.
   * @param {IDispatcherEvent[]} events - IDispatcherEvent[]
   * @returns The DispatcherEngine instance.
   */
  public setEvents(events: IDispatcherEvent[]): DispatcherEngine {
    events.forEach((event: IDispatcherEvent) => this.setEvent(event));
    return this;
  }

  /**
   * It returns the events array
   * @returns An array of IDispatcherEvent objects.
   */
  public getEvent(): IDispatcherEvent[] {
    return this._events;
  }

  /**
   * It loops through all the events, and for each event, it loops through all the listeners, and if
   * the listener is not excepted, it registers the listener to the event
   */
  public register(): void {
    this._events.forEach((event: IDispatcherEvent) => {
      const listeners = event.getListeners();
      listeners.forEach((listener: IDispatcherListener) => {
        if (listener.except()) return null;

        if (listener.once()) {
          this.once(event.getName(), (args: object = {}) => {
            setImmediate(() => {
              listener.handle(args);
            });
          });
        } else {
          this.on(event.getName(), (args: object = {}) => {
            setImmediate(() => {
              listener.handle(args);
            });
          });
        }
      });
    });
  }

  /**
   * It takes an event name and an object of arguments, and emits the event with the arguments
   * @param {string} event - The name of the event to fire.
   * @param {object} args - object = {}
   */
  public fire(event: string, args: object = {}) {
    this.emit(event, args);
  }
}
