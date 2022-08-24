import { IDispatcherListener } from './listener.interface';

/* Defining an interface for the DispatcherEvent class. */
export interface IDispatcherEvent {
  setName(name: string): IDispatcherEvent;
  getName(): string;
  setListener(listener: IDispatcherListener): IDispatcherEvent;
  setListeners(listeners: IDispatcherListener[]): IDispatcherEvent;
  getListeners(): IDispatcherListener[];
}
