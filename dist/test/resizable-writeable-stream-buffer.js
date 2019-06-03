"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_buffers_1 = require("stream-buffers");
class ResizableWriteableStreamBuffer extends stream_buffers_1.WritableStreamBuffer {
    constructor() {
        super(...arguments);
        this.columns = 0;
        this.rows = 0;
    }
}
exports.ResizableWriteableStreamBuffer = ResizableWriteableStreamBuffer;
//# sourceMappingURL=resizable-writeable-stream-buffer.js.map