
export class AppConfig {
    public static port : number = parseInt(process.env.PORT ?? "3000");
    public static userApiAddress:string = process.env.USER_API_ADDRESS ?? "";
    public static productApiAddress:string = process.env.PRODUCT_API_ADDRESS ?? "";
}