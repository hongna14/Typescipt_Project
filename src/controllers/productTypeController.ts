import { Request, Response } from "express";
import {IProductType} from "../models/productTypeInterface"
import productTypeRepository from "../repository/productTypeRepository";

class ProductTypeController{
     // get product type list
     async  getProductTypeList (req:Request,res:Response){
        const raw = await productTypeRepository.getList()
        
        const result = raw.map((item:any) => {
        return {
          id: item.product_type_id,
          productTypeName: item.product_type_name,
        };
      });
        res.send(result);            
    }

    // create product type list
    async createProductType (req:Request,res:Response){
        const payload: IProductType= req.body;
        //console.log(payload)
        await productTypeRepository.create(payload)
        res.send("created 🤣");
    }

    
    // update product type list
    async updateProductType (req:Request,res:Response){
        const id:string = req.params.id;
        const payload:IProductType = req.body;
        const productTypeDetails:any = await productTypeRepository.getId(id)  
        console.log("naaaa",productTypeDetails)    
        await productTypeRepository.update(id,payload,productTypeDetails)    
        res.send("updated 🤣");
    }

    // delete product type list
    async deleteProductType (req:Request,res:Response) {
        const id:string = req.params.id;
        await productTypeRepository.delete(id)
        res.send("deleted 😍");
        
    }
    
}

export default new ProductTypeController ()