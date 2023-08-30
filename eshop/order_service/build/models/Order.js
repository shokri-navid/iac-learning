"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const uuid_1 = require("uuid");
class Order {
    constructor() {
        this.userId = "";
        this.productId = "";
        this.count = 0;
        this.id = (0, uuid_1.v4)();
        this.orderedAt = new Date();
    }
}
exports.Order = Order;
