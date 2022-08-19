export enum EventType {
    areaChanged,
    subAreaChanged,
    queryParamChanged,
}

export abstract class EventStatusHandler {
    public abstract EventUpdate(eventData: EventData): void;
}

export interface EventData {
    type: EventType;
    id?: string;
    data?: any;
    eventStatusHandler?: EventStatusHandler;
    name?: string;
}
