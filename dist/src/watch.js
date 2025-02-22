"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_stream_1 = tslib_1.__importDefault(require("json-stream"));
const request = require("request");
class DefaultRequest {
    webRequest(opts, callback) {
        return request(opts, callback);
    }
}
exports.DefaultRequest = DefaultRequest;
class Watch {
    constructor(config, requestImpl) {
        this.config = config;
        if (requestImpl) {
            this.requestImpl = requestImpl;
        }
        else {
            this.requestImpl = new DefaultRequest();
        }
    }
    watch(path, queryParams, callback, done) {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const url = cluster.server + path;
        queryParams.watch = true;
        const headerParams = {};
        const requestOptions = {
            method: 'GET',
            qs: queryParams,
            headers: headerParams,
            uri: url,
            useQuerystring: true,
            json: true,
        };
        this.config.applyToRequest(requestOptions);
        const stream = new json_stream_1.default();
        stream.on('data', (data) => callback(data.type, data.object));
        const req = this.requestImpl.webRequest(requestOptions, (error, response, body) => {
            if (error) {
                done(error);
            }
            else {
                done(null);
            }
        });
        req.pipe(stream);
        return req;
    }
}
exports.Watch = Watch;
//# sourceMappingURL=watch.js.map