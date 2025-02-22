"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonpath = tslib_1.__importStar(require("jsonpath-plus"));
const shelljs = tslib_1.__importStar(require("shelljs"));
class CloudAuth {
    isAuthProvider(user) {
        if (!user || !user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'azure' || user.authProvider.name === 'gcp';
    }
    getToken(user) {
        const config = user.authProvider.config;
        if (this.isExpired(config)) {
            this.updateAccessToken(config);
        }
        return 'Bearer ' + config['access-token'];
    }
    isExpired(config) {
        const token = config['access-token'];
        const expiry = config.expiry;
        if (!token) {
            return true;
        }
        if (!expiry) {
            return false;
        }
        const expiration = Date.parse(expiry);
        if (expiration < Date.now()) {
            return true;
        }
        return false;
    }
    updateAccessToken(config) {
        if (!config['cmd-path']) {
            throw new Error('Token is expired!');
        }
        const args = config['cmd-args'];
        // TODO: Cache to file?
        // TODO: do this asynchronously
        let result;
        try {
            let cmd = config['cmd-path'];
            if (args) {
                cmd = `${cmd} ${args}`;
            }
            result = shelljs.exec(cmd, { silent: true });
            if (result.code !== 0) {
                throw new Error(result.stderr);
            }
        }
        catch (err) {
            throw new Error('Failed to refresh token: ' + err.message);
        }
        const output = result.stdout.toString();
        const resultObj = JSON.parse(output);
        const tokenPathKeyInConfig = config['token-key'];
        const expiryPathKeyInConfig = config['expiry-key'];
        // Format in file is {<query>}, so slice it out and add '$'
        const tokenPathKey = '$' + tokenPathKeyInConfig.slice(1, -1);
        const expiryPathKey = '$' + expiryPathKeyInConfig.slice(1, -1);
        config['access-token'] = jsonpath.JSONPath(tokenPathKey, resultObj);
        config.expiry = jsonpath.JSONPath(expiryPathKey, resultObj);
    }
}
exports.CloudAuth = CloudAuth;
//# sourceMappingURL=cloud_auth.js.map