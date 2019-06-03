"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matcher_1 = require("ts-mockito/lib/matcher/type/Matcher");
function matchBuffer(channel, contents) {
    return new StringBufferMatcher(channel, contents);
}
exports.matchBuffer = matchBuffer;
class StringBufferMatcher extends Matcher_1.Matcher {
    constructor(channel, contents) {
        super();
        this.channel = channel;
        this.contents = contents;
    }
    match(value) {
        if (value instanceof Buffer) {
            const buffer = value;
            const channel = buffer.readInt8(0);
            const contents = buffer.toString('utf8', 1);
            return this.channel === channel && this.contents === contents;
        }
        return false;
    }
    toString() {
        return `buffer did not contain "${this.contents}"`;
    }
}
//# sourceMappingURL=match-buffer.js.map