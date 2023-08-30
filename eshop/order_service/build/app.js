"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const Order_1 = require("./models/Order");
dotenv.config();
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
    console.log(process.env.USER_API_ADDRESS);
    res.json(orders);
});
app.listen(port, () => {
    console.log("Express HTTP Server is listening to:" + port);
});
