"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class CallAwaiter extends events_1.EventEmitter {
    awaitCall(event) {
        return new Promise((resolve) => {
            this.once(event, resolve);
        });
    }
    resolveCall(event) {
        return (...args) => this.emit(event, ...args);
    }
}
exports.CallAwaiter = CallAwaiter;
//# sourceMappingURL=call-awaiter.js.map