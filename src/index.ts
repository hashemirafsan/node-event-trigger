import { EventEmitter } from 'node:events';

interface IDispatcherListener {
    once(): boolean;
    except(): boolean;
    handle(args: object): void;
}

interface IDispatcherEvent {
    setName(name: string): IDispatcherEvent;
    getName(): string;
    setListener(listener: IDispatcherListener): IDispatcherEvent;
    setListeners(listeners: IDispatcherListener[]): IDispatcherEvent;
    getListeners(): IDispatcherListener[];
}

class DispatchableEvent implements IDispatcherEvent {
    protected name: string;
    protected listeners: IDispatcherListener[] = [];

    constructor(name: string) {
        this.name = name;
    }

    setName(name: string): DispatchableEvent {
        this.name = name;
        return this;
    }

    getName(): string {
        return this.name;
    }

    setListener(listener: IDispatcherListener): DispatchableEvent {
        this.listeners.push(listener);
        return this;
    }

    setListeners(listeners: IDispatcherListener[]): DispatchableEvent {
        listeners.forEach((listener: IDispatcherListener) => this.setListener(listener));
        return this;
    }

    getListeners(): IDispatcherListener[] {
        return this.listeners;
    }
}

class DispatchableListener implements IDispatcherListener {
    private _isOnce: boolean = false;
    private _expect: boolean = false;
    private _listenerCallback: Function;

    constructor(listenerCallback: Function) {
        this._listenerCallback = listenerCallback;
    }

    once(): boolean {
        return this._isOnce;
    }

    except(): boolean {
        return this._expect;
    }

    setOnce(val: boolean): DispatchableListener {
        this._isOnce = val;
        return this;
    }

    setExcept(val: boolean): DispatchableListener {
        this._expect = val;
        return this;
    }

    async handle(args: object) {
        await this._listenerCallback(args);
    }
}

class DispatcherEngine extends EventEmitter {
    private events: IDispatcherEvent[] = [];

    public setEvent(event: IDispatcherEvent): DispatcherEngine {
        this.events.push(event);
        return this;
    }

    public setEvents(events: IDispatcherEvent[]): DispatcherEngine {
        events.forEach((event: IDispatcherEvent) => this.setEvent(event));
        return this;
    }

    public getEvent(): IDispatcherEvent[] {
        return this.events;
    }

    public register(): void {
        this.events.forEach((event: IDispatcherEvent) => {
            const listeners = event.getListeners();
            listeners.forEach((listener: IDispatcherListener, index) => {
                if (listener.except()) return null;

                if (listener.once()) {
                    this.once(event.getName(), (args = null) => {
                        setImmediate(() => {
                            listener.handle(args);
                        })
                    })
                } else {
                    this.on(event.getName(), (args) => {
                        setImmediate(() => {
                            listener.handle(args);
                        })
                    });
                }
            });
        })
    }

    public fire(event: string, args: object = {}) {
        this.emit(event, args)
    }
}

export {
    DispatchableEvent,
    DispatchableListener,
    DispatcherEngine,
    IDispatcherListener,
    IDispatcherEvent,
}