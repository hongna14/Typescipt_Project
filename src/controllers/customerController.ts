
import { Request, Response } from "express";
import { ICustomer } from "../models/customerInterface";
import customerRepository from "../repository/customerRepository"


class CustomerController{
    //get Customer List
    async getCostomerList(req: Request,res:Response){
        const raw = await customerRepository.getList()
        console.log(raw)
        const result = raw.map((item: any)=>{
          return {
            id: item.customer_id,
            customerName: item.customer_name,
            customerAddress: item.customer_address,
            customerPhone: item.customer_phone
          }
        })  
        res.send(result)
    }

    //create Customer
    async createCustomer (req: Request,res:Response){
        const payload:ICustomer = req.body
        await customerRepository.create(payload)
        res.send("created !!!")
        
    }

    //Update Customer

    async updateCustomer(req: Request,res:Response){
        const payload= req.body
        const id = req.params.id
        
        const customerDetails= await customerRepository.getById(id)
        await customerRepository.update(id,payload,customerDetails)

        res.send("Updated !!!")
    }

    //delete customer
    async deleteCustomer(req: Request,res:Response){
        const id:string = req.params.id
        await customerRepository.delete(id)
        res.send("deleted!!!")

    }

}


export default new CustomerController()