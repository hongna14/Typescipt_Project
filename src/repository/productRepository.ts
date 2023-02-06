import { IProduct } from "../models/productInterface";

import { executeQuery, getMany, getOne } from "../databaseConfig/client";

class ProductRepository {
  getList() {
    const query = `SELECT *
        FROM product 
        INNER JOIN product_type ON product.product_type_id = product_type.product_type_id `;
    return getMany(query);
  }

  getById(id: string) {
    const params = [id]
    const query = `SELECT *
        FROM product 
        INNER JOIN product_type ON product.product_type_id = product_type.product_type_id
        WHERE product.product_id =  $1`;
    return getOne(query, params);
  }

  async create(payload: IProduct) {
    const { productName, productPrice, productId } = payload
    const params = [productName, productPrice, productId]
    const query = `INSERT INTO product (product_name, product_price , product_type_id) 
    VALUES($1, $2, $3);`;
    await executeQuery(query, params);
    console.log(params)
  }

  async update(id: string, payload: IProduct, productDetails: any) {
    const { productName, productTypeId, productPrice } = payload
    const { product_name, product_type_id, product_price } = productDetails
    const params = [
      productName || product_name,
      productTypeId || product_type_id,
      productPrice || product_price,
      id,
    ]
    const updateQuery = `
    UPDATE 
      product
    SET 
      product_name =$1 ,
      product_type_id = $2,
      product_price =$3,
    WHERE 
      product_id = $4`
    await executeQuery(updateQuery, params);
  }
  //injection 

  delete(id: string) {
    const params = [id]
    const query = `DELETE
    FROM product 
    WHERE product_id =  $1;`;

    return executeQuery(query, params);
  }
}

export default new ProductRepository();
