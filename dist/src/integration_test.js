"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const chai_as_promised_1 = tslib_1.__importDefault(require("chai-as-promised"));
const nock_1 = tslib_1.__importDefault(require("nock"));
const api_1 = require("./api");
const config_1 = require("./config");
chai_1.use(chai_as_promised_1.default);
describe('FullRequest', () => {
    describe('getPods', () => {
        it('should get pods successfully', () => {
            const kc = new config_1.KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://nowhere.foo',
            };
            const username = 'foo';
            const password = 'some-password';
            const user = {
                name: 'my-user',
                username,
                password,
            };
            kc.loadFromClusterAndUser(cluster, user);
            const k8sApi = kc.makeApiClient(api_1.Core_v1Api);
            const result = {
                kind: 'PodList',
                apiVersion: 'v1',
                items: [],
            };
            const auth = Buffer.from(`${username}:${password}`).toString('base64');
            nock_1.default('https://nowhere.foo:443', {
                reqheaders: {
                    authorization: `Basic ${auth}`,
                },
            })
                .get('/api/v1/namespaces/default/pods')
                .reply(200, result);
            const promise = k8sApi.listNamespacedPod('default');
            return chai_1.expect(promise)
                .to.eventually.have.property('body')
                .that.deep.equals(result);
        });
    });
});
//# sourceMappingURL=integration_test.js.map