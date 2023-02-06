
import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import {IEmployee} from "../models/employeeInterface"

class EmployeeRepository{
    getList(){
        const query = `SELECT * 
        FROM employee
        INNER JOIN coffee_shop on coffee_shop.coffee_shop_id= employee.coffee_shop_id;`
        return getMany(query)
    }

    getById(id:string){
        const params = [id]
        const query = `SELECT *
        FROM employee
        INNER JOIN coffee_shop on coffee_shop.coffee_shop_id= employee.coffee_shop_id
        WHERE employee_id = $1;`
        return getOne(query,params)
    }

    create(payload:IEmployee){
        // const query = `INSERT INTO employee (employee_position,employee_name,employee_phone_number,coffee_shop_id) VALUES
        // ('${payload.employeePosition}', '${payload.employeeName}', ${payload.employeePhoneNumber}, ${payload.coffeeShopId});`
        const { employeePosition, employeeName, employeePhoneNumber, coffeeShopId } = payload
        const query = `INSERT INTO employee (employee_position,employee_name,employee_phone_number,coffee_shop_id) VALUES
        ($1, $2, $3, $4);`
        const params = [employeePosition, employeeName, employeePhoneNumber, coffeeShopId]
        return executeQuery(query, params)

    }

    update(id:string, payload: IEmployee, employeeDetails:any){
        const {employeePosition,employeeName,employeePhoneNumber,coffeeShopId} = payload
        const {employee_position,employee_name,employee_phone_number,coffee_shop_id} = employeeDetails
        const params =[
            employeePosition || employee_position,
            employeeName || employee_name,
            employeePhoneNumber || employee_phone_number,
            coffeeShopId || coffee_shop_id,
            id,
        ] 
        const updateQuery =`
        UPDATE 
            employee
        SET 
            employee_position = $1,
            employee_name =$2,
            employee_phone_number =$3,
            coffee_shop_id= $4
        WHERE 
            employee_id = $5;`
        return executeQuery(updateQuery,params)
    }

    delete(id:string){
        const params =[id]
        const query = `DELETE
        FROM employee
        WHERE employee_id = $1;`
        return executeQuery(query,params)
    }

}

export default new EmployeeRepository()