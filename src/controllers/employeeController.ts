import { Request, Response } from "express";
import employeeRepository from "../repository/employeeRepository";
import { IEmployee } from "../models/employeeInterface";
class EmployeeController{
        // get Employee list
        async getemployeeList(req: Request,res: Response){
            const raw = await employeeRepository.getList()

            const result = raw.map((item:any)=>{
                return {
                    id: item.employee_id,
                    employeePosition: item.employee_position,
                    employeeName: item.employee_name,
                    employeePhoneNumber: item.employee_phone_number,
                    coffeeShopAddress: item.coffee_shop_address
    
                }
            })
            res.send(result)
        }
    
        //get Employee Details
        async getEmployeeDetails(req: Request,res: Response){
        
            const id:string = req.params.id
            
            const raw = await employeeRepository.getById(id)
            if(!raw){
                res.send("Employee doesn't exit!!! 🥱😫😫");
                return;
            }
            const result ={
                id: raw.employee_id,
                employeePosition: raw.employee_position,
                employeeName: raw.employee_name,
                employeePhoneNumber: raw.employee_phone_number,
                coffeeShopAddress: raw.coffee_shop_address
            }
    
            res.send(result)
        }
    
        //create Employee
        async createEmployee(req: Request,res: Response){
            const payload: IEmployee = req.body;
            await employeeRepository.create(payload)
            res.send("created");
        }
    
        //Update Employee
        async updateEmployee(req: Request,res: Response){
            const id:string = req.params.id
            const payload:IEmployee = req.body
            const employeeDetails:any = await employeeRepository.getById(id)
            await employeeRepository.update(id,payload,employeeDetails)
            res.send("update!!!")
        }
        
        //Delete Employee
        async deleteEmployee(req: Request,res: Response){
            const id = req.params.id
            await employeeRepository.delete(id)
            res.send("deleted")
        }
}

export default new EmployeeController()