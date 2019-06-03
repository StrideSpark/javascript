import { EventEmitter } from 'events';
export declare class CallAwaiter extends EventEmitter {
    awaitCall(event: string): Promise<any[]>;
    resolveCall(event: string): (...args: any[]) => boolean;
}
