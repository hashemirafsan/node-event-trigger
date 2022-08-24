/* Defining an interface for a class. */
export interface IDispatcherListener {
  once(): boolean;
  except(): boolean;
  handle(args: object): void;
}
