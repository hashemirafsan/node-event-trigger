import { IDispatcherEvent } from './interfaces/event.interface';
import { IDispatcherListener } from './interfaces/listener.interface';

/* It's a class that holds a name and a list of listeners */
export class DispatchableEvent implements IDispatcherEvent {
  protected name: string;
  protected listeners: IDispatcherListener[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * It sets the name of the event and returns the event.
   * @param {string} name - The name of the event.
   * @returns The event itself.
   */
  setName(name: string): DispatchableEvent {
    this.name = name;
    return this;
  }

  /**
   * The function getName() returns a string
   * @returns The name of the person.
   */
  getName(): string {
    return this.name;
  }

  /**
   * "This function adds a listener to the list of listeners."
   * 
   * The first line of the function is the function declaration. It's a function named setListener that
   * takes a parameter named listener. The parameter is of type IDispatcherListener. The function
   * returns a DispatchableEvent
   * @param {IDispatcherListener} listener - IDispatcherListener - The listener to add to the event.
   * @returns The event itself.
   */
  setListener(listener: IDispatcherListener): DispatchableEvent {
    this.listeners.push(listener);
    return this;
  }

  /**
   * Set multiple listeners at once.
   * @param {IDispatcherListener[]} listeners - IDispatcherListener[]
   * @returns The DispatchableEvent object.
   */
  setListeners(listeners: IDispatcherListener[]): DispatchableEvent {
    listeners.forEach((listener: IDispatcherListener) => this.setListener(listener));
    return this;
  }

  /**
   * It returns the array of listeners
   * @returns An array of IDispatcherListener objects.
   */
  getListeners(): IDispatcherListener[] {
    return this.listeners;
  }
}
