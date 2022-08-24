import { IDispatcherListener } from './interfaces/listener.interface';

/* It's a class that implements the IDispatcherListener interface, and it's used to wrap a callback
function so that it can be used as a listener */
export class DispatchableListener implements IDispatcherListener {
  private _isOnce: boolean = false;
  private _expect: boolean = false;
  private _listenerCallback: (args: object) => {};

  constructor(listenerCallback: (args: object) => {}) {
    this._listenerCallback = listenerCallback;
  }

  /**
   * It returns the value of the private variable `_isOnce`
   * @returns The value of the private property _isOnce.
   */
  once(): boolean {
    return this._isOnce;
  }

  /**
   * It returns a boolean value that indicates whether the current instance of the class is expecting a
   * value or not
   * @returns The value of the private variable _expect.
   */
  except(): boolean {
    return this._expect;
  }

  /**
   * This function sets the value of the private property `_isOnce` to the value of the parameter `val`
   * and returns the current instance of the class.
   * @param {boolean} val - The value to set the listener to.
   * @returns The DispatchableListener object itself.
   */
  setOnce(val: boolean): DispatchableListener {
    this._isOnce = val;
    return this;
  }

  /**
   * It sets the expect property of the DispatchableListener object to the value passed in.
   * @param {boolean} val - The value to set the parameter to.
   * @returns The DispatchableListener object itself.
   */
  setExcept(val: boolean): DispatchableListener {
    this._expect = val;
    return this;
  }

  /**
   * The `handle` function is an asynchronous function that takes an object as an argument and calls
   * the `_listenerCallback` function with the argument
   * @param {object} args - object - The arguments passed to the event.
   */
  async handle(args: object) {
    await this._listenerCallback(args);
  }
}
