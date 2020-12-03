"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const customApp_1 = tslib_1.__importDefault(require("./customApp"));
class Drush extends customApp_1.default {
    constructor() {
        super(...arguments);
        this.alias = 'drush';
        this.name = 'Drush';
        this.shasum = '97e64b94588eeca5f97ffcb0595c7e3988e685651d898d65c3ae07ca8f9c94c6';
        this.url = 'https://github.com/drush-ops/drush-launcher/releases/download/0.8.0/drush.phar';
    }
}
//# sourceMappingURL=drush.js.map