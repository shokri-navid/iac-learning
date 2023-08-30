import express, {Request, Response, Application} from "express";
import * as dotenv  from "dotenv"
import {AddOrderRequest} from "./models/AddOrderRequest";
import { Order } from "./models/Order";
import { constrainedMemory } from "process";

var app : Application = express();
var port : number = 3000;

var orders : Order[] = [];
app.use(express.json());

app.post("/orders", (req: Request, res: Response) : void=> {
    let orderReq : AddOrderRequest = req.body;
    let order : Order = new Order();
    order.productId = orderReq.productId;
    order.userId = orderReq.userId
    order.count = orderReq.count;
    orders.push(order);
    res.end();
});

app.get("/orders", (req: Request, res: Response): void => {
    res.json(orders);
});

app.listen(port, () : void => {
    console.log("Express HTTP Server is listening to:" + port)
});



