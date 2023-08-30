import express, {Request, Response, Application} from "express";
import * as dotenv  from "dotenv"
import {AddOrderRequest} from "./models/AddOrderRequest";
import { Order } from "./models/Order";
import axios, {AxiosResponse, AxiosError} from "axios";
import { AppConfig } from "./models/AppConfig";

dotenv.config();
var app : Application = express();
var port : number = 3000;

var orders : Order[] = [];
app.use(express.json());

app.post("/orders", async (req: Request, response: Response) => {
    let orderReq : AddOrderRequest = req.body;
    
    var errors : string[] = [];  
    
    axios.get(`${process.env.USER_API_ADDRESS}/users/${orderReq.userId}`)
    .then((res: AxiosResponse) =>{

        axios.put(`${process.env.PRODUCT_API_ADDRESS}/api/products/${orderReq.productId}`, {quantity: orderReq.count})
        .then((res: AxiosResponse) =>{
            let order : Order = new Order();
            order.productId = orderReq.productId;
            order.userId = orderReq.userId
            order.count = orderReq.count;
            orders.push(order);
            response.send();
        }).catch((error: AxiosError)=>{
            if (error.response?.status == 404){
                errors.push("product not found");
            }
            else if (error.response?.status == 400){
                errors.push("order more than available in stoc;");
            }
            response.status(400).json(errors);
        });
    }).catch((error: AxiosError)=>{
        if (error.response?.status == 404){
            
            errors.push("user not found");
        }
        response.status(400).json(errors);
    });
});

app.get("/orders", (req: Request, res: Response): void => {
    res.json(orders);
});

app.listen(process.env.PORT, () : void => {
    console.log("Express HTTP Server is listening to:" + process.env.PORT)
});



