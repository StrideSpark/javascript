"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const exec_auth_1 = require("./exec_auth");
describe('ExecAuth', () => {
    it('should correctly exec', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const auth = new exec_auth_1.ExecAuth();
        auth.execFn = (command, opts) => {
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            };
        };
        const token = auth.getToken({
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        });
        chai_1.expect(token).to.equal('Bearer foo');
    }));
    it('should exec with env vars', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const auth = new exec_auth_1.ExecAuth();
        let optsOut = {};
        auth.execFn = (command, opts) => {
            optsOut = opts;
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            };
        };
        process.env.BLABBLE = 'flubble';
        const token = auth.getToken({
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                        env: [
                            {
                                name: 'foo',
                                value: 'bar',
                            },
                        ],
                    },
                },
            },
        });
        chai_1.expect(optsOut.env.foo).to.equal('bar');
        chai_1.expect(optsOut.env.PATH).to.equal(process.env.PATH);
        chai_1.expect(optsOut.env.BLABBLE).to.equal(process.env.BLABBLE);
    }));
});
//# sourceMappingURL=exec_auth_test.js.map