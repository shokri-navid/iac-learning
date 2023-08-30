import {express, Request, Response} from "express";
const app = express();
const port = 3000;
app.use(express.json());

const orders = [];
app.get("/start", (req, res)=>{
    res.send("hello, world!!!");
});


app.post("/orders", (req: Request, res: Response) => {
    var t = req.body;
    res.json(t);
});
app.listen(port, ()=>{
    console.log("Express http server is running on port:" + port);
});