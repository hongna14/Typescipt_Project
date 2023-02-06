import { Request, Response } from "express";
import { IPaymentType } from "../models/paymentTypeInterface";
import paymentTypeRepository from "../repository/paymentTypeRepository";

class PaymentTypeController{
    async getPaymentTypeList(req:Request,res:Response){
        const raw = await paymentTypeRepository.getList()
        const result = raw.map((item:any)=>{
            return {
                paymentTypeId: item.payment_type_id,
                paymentTypeName: item.payment_type_description
            }
        })

        res.send(result)
    }

    async createPaymentType (req:Request,res:Response){
        const payload:IPaymentType = req.body
        await paymentTypeRepository.create(payload)
        res.send("create")
    }
    async updatePaymentType(req:Request,res:Response){
        const paymentTypeId:string= req.params.id
        const payload:IPaymentType = req.body
        const paymentDetails:any = await paymentTypeRepository.getById(paymentTypeId)
       
        await paymentTypeRepository.update(paymentTypeId,payload, paymentDetails)
        res.send("updated!!!")
    }

    async deletePaymentType (req:Request,res:Response){
        const paymentTypeId:string = req.params.id
        await paymentTypeRepository.delete(paymentTypeId)
        res.send("Deleted")
    }

}

export default new PaymentTypeController()