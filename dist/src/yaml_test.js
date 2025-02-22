"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const yaml_1 = require("./yaml");
describe('yaml', () => {
    it('should load safely', () => {
        const yaml = 'apiVersion: v1\n' + 'kind: Namespace\n' + 'metadata:\n' + '  name: some-namespace\n';
        const ns = yaml_1.loadYaml(yaml);
        chai_1.expect(ns.apiVersion).to.equal('v1');
        chai_1.expect(ns.kind).to.equal('Namespace');
        chai_1.expect(ns.metadata.name).to.equal('some-namespace');
    });
    it('should load all safely', () => {
        const yaml = 'apiVersion: v1\n' +
            'kind: Namespace\n' +
            'metadata:\n' +
            '  name: some-namespace\n' +
            '---\n' +
            'apiVersion: v1\n' +
            'kind: Pod\n' +
            'metadata:\n' +
            '  name: some-pod\n' +
            '  namespace: some-ns\n';
        const objects = yaml_1.loadAllYaml(yaml);
        chai_1.expect(objects.length).to.equal(2);
        chai_1.expect(objects[0].kind).to.equal('Namespace');
        chai_1.expect(objects[1].kind).to.equal('Pod');
        chai_1.expect(objects[0].metadata.name).to.equal('some-namespace');
        chai_1.expect(objects[1].metadata.name).to.equal('some-pod');
        chai_1.expect(objects[1].metadata.namespace).to.equal('some-ns');
    });
    it('should round trip successfully', () => {
        const expected = {
            metadata: {
                name: 'test',
            },
        };
        const yamlString = yaml_1.dumpYaml(expected);
        const actual = yaml_1.loadYaml(yamlString);
        chai_1.expect(actual).to.deep.equal(expected);
    });
});
//# sourceMappingURL=yaml_test.js.map