import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import { IOrder } from "../models/orderInterface";

class OrderRepository{
    getList(){
        const query = `SELECT *
        FROM orders
        INNER JOIN customer on customer.customer_id = orders.customer_id
        INNER JOIN payment_type on payment_type.payment_type_id = orders.payment_type_id
        INNER JOIN product on product.product_id=orders.product_id
        INNER JOIN coffee_shop on coffee_shop.coffee_shop_id=orders.coffee_shop_id;`
        return getMany(query)
    }
    getById(id:string){  
        const params=[id]
        const getDetailsOrder = ` SELECT * FROM orders
        INNER JOIN customer on customer.customer_id = orders.customer_id
        INNER JOIN payment_type on payment_type.payment_type_id = orders.payment_type_id
        INNER JOIN product on product.product_id=orders.product_id
        INNER JOIN coffee_shop on coffee_shop.coffee_shop_id=orders.coffee_shop_id
        WHERE order_id = $1;`
        return getOne(getDetailsOrder,params)
    }
    create(payload:IOrder){
        const {orderDate,orderQuantity,productId,coffeeShopId,customerId,paymentTypeId} =payload
        const params =[orderDate,orderQuantity,productId,coffeeShopId,customerId,paymentTypeId]
        const query = `INSERT INTO orders 
        (order_date,order_quantity,product_id,coffee_shop_id, customer_id,payment_type_id)
        VALUES ($1,$2, $3,$4,$5,$6);`
        console.log(query)
        return executeQuery(query,params)

    }
    update(id:string, payload: IOrder, orderDetails:any){
        const {orderDate,orderQuantity,productId,coffeeShopId,customerId,paymentTypeId} = payload
        const {order_date,order_quantity,product_id,coffee_shop_id,customer_id,payment_type_id} =orderDetails
        const params =[
            orderDate?.toISOString() || order_date.toISOString(),
            orderQuantity || order_quantity,
            productId || product_id,
            coffeeShopId || coffee_shop_id,
            customerId || customer_id,
            paymentTypeId || payment_type_id,
            id,
        ]

        const updateQuery = `
        UPDATE 
            orders
        SET 
            order_date =$1,
            order_quantity = $2,
            product_id = $3,
            coffee_shop_id =$4,
            customer_id=$5,
            payment_type_id=$6
        WHERE 
            order_id=$7;`
        return executeQuery(updateQuery,params)
    }
    delete(id:string){
        const params =[id]
        const query = `DELETE 
        FROM orders
        WHERE order_id =$1;`
        return executeQuery(query,params)

    }
}

export default new OrderRepository()
