import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import { IPaymentType } from "../models/paymentTypeInterface";

class PaymentRepository{
    getList(){
        const query = `SELECT * FROM payment_type;`
        return getMany(query)

    }
    getById(id:string){
        const params =[id]
        const getDetailsQuery = `SELECT * FROM payment_type
        WHERE payment_type_id = $1;`
        return getOne(getDetailsQuery,params)
    }
    create(payload:IPaymentType){
        const {paymentTypeName}=payload
        const params =[paymentTypeName]
        const query = `INSERT INTO payment_type (payment_type_description)
        VALUES ($1);`
        return executeQuery(query,params)
    }
    update(id:string,payload:IPaymentType,paymentDetails:any){
        const {paymentTypeName} = payload
        const {payment_type_description} =paymentDetails
        const params =[
            paymentTypeName || payment_type_description,
            id,
        ]
        const updateQuery =`
        UPDATE 
            payment_type
        SET 
            payment_type_description = $1
        WHERE 
            payment_type_id = $2;`
        return executeQuery(updateQuery,params)
    }
    delete(id:string){
        const params =[id]
        const query = `DELETE 
        FROM payment_type
        WHERE payment_type_id =${id};`
        return executeQuery(query,params)

    }
}

export default new PaymentRepository()