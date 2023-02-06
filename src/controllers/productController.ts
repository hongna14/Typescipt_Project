import { Request, Response } from "express";
import { IProduct } from "../models/productInterface";
import productRepository from "../repository/productRepository";

class ProductController {
  // get product list
  async getProductList(req: Request, res: Response) {
    const raw = await productRepository.getList();
    const result = raw.map((item: any) => {
      return {
        id: item.product_id,
        productName: item.product_name,
        productPrice: item.product_price,
        productType: item.product_type_name,
      };
    });
    res.send(result);
  }

  //get product details

  async getProductDetails(req: Request, res: Response) {
    const id:string = req.params.id;
    
    const raw = await productRepository.getById(id);
    if (!raw) {
      res.send("This product is unvailable!!! 🥱😫😫");
      return;
    }
    const result = {
      id: raw.product_id,
      productName: raw.product_name,
      productPrice: raw.product_price,
      productType: raw.product_type_name,
    };
    res.send(result);
  }

  // create product
  async createProduct(req: Request, res: Response) {
    const payload: IProduct = req.body;
    await productRepository.create(payload);
    res.send("created 🤣");
  }

  async updateProduct(req: Request, res: Response) {
    const id= req.params.id;
    console.log(id)
    const payload = req.body;
    const productDetails= await productRepository.getById(id);
    
    console.log(productDetails)
    await productRepository.update(id, payload, productDetails);
    res.send("updated 🤣");
  }
  //delete product
  async delerteProduct(req: Request, res: Response) {
    const id = req.params.id;
    await productRepository.delete(id);
    res.send("deleted 😍");
  }
}

export default new ProductController();
