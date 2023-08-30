import {v4 as uuidv4 } from "uuid";
export class Order{
    public constructor(){
        this.id  = uuidv4();
        this.orderedAt = new Date();
    }
    public id : string ;
    public userId : string = "";
    public productId : string = "";
    public count : number = 0;
    public orderedAt : Date;

}