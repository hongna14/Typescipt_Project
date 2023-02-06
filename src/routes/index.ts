 import ProductController from "../controllers/productController";

import BranchController from "../controllers/branchController"
import CustomerController from "../controllers/customerController";
import EmployeeController from "../controllers/employeeController";
import PaymentTypeController from "../controllers/paymentTypeController";
import ProductTypeController from "../controllers/productTypeController";
import OrderController from "../controllers/orderController";
import CommonValidator from "../validators/commonValidator";




function route(app: any) {
  //Branch
  app.get("/branch", BranchController.getBranchList)

  app.get("/branch/:id",CommonValidator.checkIdParam(), BranchController.getBranchDetails)

  app.post("/branch", BranchController.createBranch)

  app.put("/branch/:id",CommonValidator.checkIdParam(), BranchController.updateBranch)

  app.delete("/branch/:id", CommonValidator.checkIdParam(),BranchController.deleteBranch)

  //product
  app.get("/product", ProductController.getProductList);

  app.get("/product/:id",CommonValidator.checkIdParam(), ProductController.getProductDetails);

  app.post("/product", ProductController.createProduct);

  app.put("/product/:id",CommonValidator.checkIdParam(), ProductController.updateProduct);

  app.delete("/product/:id", CommonValidator.checkIdParam(),ProductController.delerteProduct);

  //product type
  app.get("/productType",ProductTypeController.getProductTypeList);

  app.post("/productType", ProductTypeController.createProductType);

  app.put("/productType/:id",CommonValidator.checkIdParam(), ProductTypeController.updateProductType);

  app.delete("/productType/:id",CommonValidator.checkIdParam(), ProductTypeController.deleteProductType);

  //customer
    app.get("/customer", CustomerController.getCostomerList)

    app.post("/customer", CustomerController.createCustomer)

    app.put("/customer/:id", CommonValidator.checkIdParam(),CustomerController.updateCustomer)

    app.delete("/customer/:id", CommonValidator.checkIdParam(),CustomerController.deleteCustomer)

  //employee
  app.get("/employee", EmployeeController.getemployeeList)

  app.get("/employee/:id",CommonValidator.checkIdParam(), EmployeeController.getEmployeeDetails)

  app.post("/employee", EmployeeController.createEmployee)

  app.put("/employee/:id", CommonValidator.checkIdParam(),EmployeeController.updateEmployee)

  app.delete("/employee/:id", CommonValidator.checkIdParam(),EmployeeController.deleteEmployee)

  //payment type
  app.get("/paymentType", PaymentTypeController.getPaymentTypeList)

  app.post("/paymentType", PaymentTypeController.createPaymentType)

  app.put("/paymentType/:id", CommonValidator.checkIdParam(),PaymentTypeController.updatePaymentType)

  app.delete("/paymentType/:id",CommonValidator.checkIdParam(), PaymentTypeController.deletePaymentType)

  //order
  app.get("/order", OrderController.getOrderList)
  app.get("/order/:id",CommonValidator.checkIdParam(), OrderController.getOrderDetails)
  app.post("/order", OrderController.createOrder)
  app.put("/order/:id", CommonValidator.checkIdParam(),OrderController.updateOrder)
  app.delete("/order/:id", CommonValidator.checkIdParam(),OrderController.deleteOrder)
  
}

// module.exports = route;
export default route;
