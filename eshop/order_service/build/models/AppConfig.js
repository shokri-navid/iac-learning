"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
class AppConfig {
}
exports.AppConfig = AppConfig;
AppConfig.port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000");
AppConfig.userApiAddress = (_b = process.env.USER_API_ADDRESS) !== null && _b !== void 0 ? _b : "";
AppConfig.productApiAddress = (_c = process.env.PRODUCT_API_ADDRESS) !== null && _c !== void 0 ? _c : "";
