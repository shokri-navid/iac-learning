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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const Order_1 = require("./models/Order");
const axios_1 = __importDefault(require("axios"));
dotenv.config();
var app = (0, express_1.default)();
var port = 3000;
var orders = [];
app.use(express_1.default.json());
app.post("/orders", (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    let orderReq = req.body;
    var errors = [];
    console.log(`${process.env.PRODUCT_API_ADDRESS}/api/products/${orderReq.userId}`);
    console.log(`${process.env.USER_API_ADDRESS}/users/${orderReq.userId}`);
    axios_1.default.get(`${process.env.USER_API_ADDRESS}/users/${orderReq.userId}`)
        .then((res) => {
        axios_1.default.put(`${process.env.PRODUCT_API_ADDRESS}/api/products/${orderReq.productId}`, { quantity: orderReq.count })
            .then((res) => {
            let order = new Order_1.Order();
            order.productId = orderReq.productId;
            order.userId = orderReq.userId;
            order.count = orderReq.count;
            orders.push(order);
            response.send();
        }).catch((error) => {
            var _a, _b;
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                errors.push("product not found");
            }
            else if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) == 400) {
                errors.push("order more than available in stoc;");
            }
            response.status(400).json(errors);
        });
    }).catch((error) => {
        var _a;
        if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
            errors.push("user not found");
        }
        response.status(400).json(errors);
    });
}));
app.get("/orders", (req, res) => {
    res.json(orders);
});
app.listen(process.env.PORT, () => {
    console.log("Express HTTP Server is listening to:" + process.env.PORT);
});
