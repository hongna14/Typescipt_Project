import { Request, Response } from "express";
import { IOrder } from "../models/orderInterface";

import orderRepository from "../repository/orderRepository";
class OrderController{
    async getOrderList(req:Request, res:Response){
        const raw = await orderRepository.getList()
        const result = raw.map((item:any)=>{
         return {
            orderId: item.order_id,
            orderDate: item.order_date,
            orderQuantity: item.order_quantity,
            producName: item.product_name,
            coffeeShopId: item.coffee_shop_name,
            customerName: item.customer_name,
            customerPhone: item.customer_phone,
            paymentTypeName: item.payment_type_name

         }   
        })
        res.send(result)
    }
    async getOrderDetails(req:Request, res:Response){

        const orderId:string = req.params.id
        
        
        const raw = await orderRepository.getById(orderId)
        const result = {
            // orderDate: raw.order_date.toString(), tim cach handle string timestam
            orderId: raw.order_id,
            orderQuantity: raw.order_quantity,
            producName: raw.product_name,
            coffeeShopAddress: raw.coffee_shop_address,
            customerName: raw.customer_name,
            customerPhone: raw.customer_phone,
            customerAddess: raw.customer_address,
            paymentTypeName: raw.payment_type_name
     }
    res.send(result)
    }
    async createOrder (req: Request, res: Response){
        const payload:IOrder = req.body
        await orderRepository.create(payload)
        res.send("created!!")
    }

    async updateOrder(req: Request, res: Response){
        const orderId:string = req.params.id
        const payload: IOrder = req.body
        const orderDetails:any = await orderRepository.getById(orderId)

        await orderRepository.update(orderId,payload,orderDetails)
        res.send("update!!! ")
    }

    async deleteOrder(req: Request, res: Response){
        const orderId = req.params.id
        await orderRepository.delete(orderId)
        res.send("deleted!!")
        
    }




   

}

export default new OrderController()