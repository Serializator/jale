"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const nginxElasticsearch_1 = tslib_1.__importDefault(require("../templates/nginxElasticsearch"));
const os_1 = require("../utils/os");
const sheepdog_1 = require("../utils/sheepdog");
const nginx_1 = tslib_1.__importDefault(require("./nginx"));
const service_1 = tslib_1.__importDefault(require("./service"));
class Elasticsearch extends service_1.default {
    constructor() {
        super(...arguments);
        this.requireRoot = false;
        this.service = 'elasticsearch';
        // TODO: These paths should be using the Client class. Otherwise they won't work cross platform.
        this.configPath = `/usr/local/etc/elasticsearch/elasticsearch.yml`;
        this.dataPath = `path.data`;
        this.dataRootPath = `/usr/local/var`;
        this.nginxConfigPath = `${sheepdog_1.sheepdogNginxAppsPath}/elasticsearch.conf`;
        this.install = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield os_1.client().packageManager.install('java', true);
                yield os_1.client().packageManager.install('homebrew/cask-versions/adoptopenjdk8', true);
                yield os_1.client().packageManager.install('libyaml');
                yield os_1.client().packageManager.install(this.service);
                return true;
            }
            catch (e) {
                return false;
            }
        });
        this.configure = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let config = yield sheepdog_1.getConfig();
                yield fs_1.writeFileSync(this.nginxConfigPath, nginxElasticsearch_1.default(config.domain));
                yield (new nginx_1.default).restart();
                return true;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = Elasticsearch;
//# sourceMappingURL=elasticsearch.js.map