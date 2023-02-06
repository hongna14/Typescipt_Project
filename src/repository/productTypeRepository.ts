import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import { IProductType } from "../models/productTypeInterface";
class ProductTypeRepository{

    getList(){
        const query = `SELECT *
        FROM product_type;`;
        return getMany(query);
    }

    getId(id:string){
        const params =[id]
        const getDetailsQuery = `SELECT *
        FROM product_type
        WHERE product_type_id =  $1`;
        return  getOne(getDetailsQuery,params);
        
    }

    create(payload: IProductType){
        const {productTypeName} =payload
        const params =[productTypeName]
        const query = `INSERT INTO product_type (product_type_name) VALUES
        ($1);`;
        return executeQuery(query,params)
    }

    update(id:string, payload:IProductType, productTypeDetails:any){
        const {productTypeName} = payload
        const {product_type_name} =productTypeDetails

        const params =[
            productTypeName || product_type_name,
            id,
        ]
        const updateQuery = `
        UPDATE 
            product_type
        SET
            product_type_name = $1
        WHERE 
            product_type_id =  $2;`
        return executeQuery(updateQuery,params)
    }

    delete(id:string){
        const params =[id]
        const query = `DELETE
        FROM product_type
        WHERE product_type_id =  $1`
        return executeQuery(query,params)
    }

}

export default new ProductTypeRepository()