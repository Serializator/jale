"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const execa_1 = tslib_1.__importDefault(require("execa"));
const fs = tslib_1.__importStar(require("fs"));
const jale_1 = require("../utils/jale");
const sudo_1 = require("../utils/sudo");
const service_1 = tslib_1.__importDefault(require("./service"));
class Dnsmasq extends service_1.default {
    constructor() {
        super(...arguments);
        this.service = 'dnsmasq';
        this.requireRoot = true;
        // TODO: These paths should be using the Client class. Otherwise they won't work cross platform.
        this.resolverPath = '/etc/resolver';
        this.configPath = '/usr/local/etc/dnsmasq.conf';
        this.customConfigPath = `${jale_1.jaleHomeDir}/dnsmasq.conf`;
        this.configure = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const config = yield jale_1.getConfig();
            yield this.appendCustomConfig;
            yield this.setDomain(config.tld);
            yield this.addDomainResolver(config.tld);
            return true;
        });
        /**
         * Append our custom configuration file to the dnsmasq.conf.
         */
        this.appendCustomConfig = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return fs.appendFileSync(this.configPath, `\nconfig-file=${this.customConfigPath}\n`);
        });
        /**
         * Set our custom tld in our custom dnsmasq config file.
         * @param tld
         */
        this.setDomain = (tld) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return fs.appendFileSync(this.customConfigPath, `address=/.${tld}/127.0.0.1\n`);
        });
        /**
         * Create the Resolver config to resolve our custom domain.
         * @param domain
         */
        this.addDomainResolver = (tld) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // TODO: Should improve this part, we're executing plain commands in order to bypass issues with root permissions.
            yield sudo_1.requireSudo();
            yield execa_1.default('sudo', ['mkdir', '-p', this.resolverPath], { shell: true, stdio: 'inherit' });
            yield execa_1.default('sudo', ['bash', '-c', `'echo "nameserver 127.0.0.1" > ${this.resolverPath}/${tld}'`], {
                shell: true,
                stdio: 'inherit'
            });
            return true;
        });
    }
}
exports.default = Dnsmasq;
//# sourceMappingURL=dnsmasq.js.map