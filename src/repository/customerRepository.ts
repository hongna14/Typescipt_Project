import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import { ICustomer } from "../models/customerInterface";

class CustomerRepository{
    getList(){
        const query = `SELECT * FROM customer;`
        return getMany(query)
    }

    getById(id:string){
        const params = [id]
        const query =  `SELECT * FROM customer
        WHERE customer_id = ${id}`
        return getOne(query,params);
    }

    create(payload:ICustomer){
        const {customerName,customerAddress,customerPhone}=payload
        const params =[customerName,customerAddress,customerPhone]
        const query = `INSERT INTO customer (customer_name, customer_address, customer_phone)
        VALUES ($1, $2, $3);`
        return executeQuery(query,params)
    }

    update(id:string,payload:ICustomer,customerDetails:any){
        const {customerName,customerAddress,customerPhone} =payload
        const {customer_name,customer_address,customer_phone} =customerDetails
        const params =[
            customerName || customer_name,
            customerAddress || customer_address,
            customerPhone || customer_phone,
            id,
        ]
        const updateQuery = `
        UPDATE 
            customer
        SET 
            customer_name = $1,
            customer_address = $2,
            customer_phone = $3
        WHERE 
            customer_id = $4;`

        return executeQuery(updateQuery,params)

    }
    delete(id:string){
        const params =[id]
        const query = `DELETE 
        FROM customer WHERE customer_id= ${id};`
        
        return executeQuery(query,params)
    }
}

export default new CustomerRepository();