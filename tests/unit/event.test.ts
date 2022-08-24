import { DispatchableListener } from "../../src/listener";
import { DispatchableEvent } from "../../src/event";

describe('Dispatchable Event Suit', () => {    
    test('setName() set event name', () => {
        const dispatchableEvent = new DispatchableEvent('new-event');
        dispatchableEvent.setName('new-event-name');
        expect(typeof dispatchableEvent.setName).toBe('function');
        expect(dispatchableEvent.getName()).toBe('new-event-name');
    });

    test('getName() return event name', () => {
        const dispatchableEvent = new DispatchableEvent('new-event');
        expect(typeof dispatchableEvent.getName).toBe('function');
        expect(dispatchableEvent.getName()).toBe('new-event');
    });

    test('setListener() set listener in event', () => {
        const dispatchableEvent = new DispatchableEvent('new-event');
        const listener = new DispatchableListener((args) => {
            return {}
        });
        dispatchableEvent.setListener(listener);

        expect(typeof dispatchableEvent.setListener).toBe('function');
        expect(dispatchableEvent.getListeners().length).toBe(1);
    });
})