import { WritableStreamBuffer } from 'stream-buffers';
export declare class ResizableWriteableStreamBuffer extends WritableStreamBuffer implements NodeJS.WritableStream {
    columns: number;
    rows: number;
}
