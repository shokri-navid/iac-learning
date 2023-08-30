"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = require("./models/Order");
var app = (0, express_1.default)();
var port = 3000;
var orders = [];
app.use(express_1.default.json());
app.post("/orders", (req, res) => {
    let orderReq = req.body;
    let order = new Order_1.Order();
    order.productId = orderReq.productId;
    order.userId = orderReq.userId;
    order.count = orderReq.count;
    orders.push(order);
    res.end();
});
app.get("/orders", (req, res) => {
    res.json(orders);
});
app.listen(port, () => {
    console.log("Express HTTP Server is listening to:" + port);
});
