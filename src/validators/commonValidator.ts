import { createValidator } from "express-joi-validation"
import Joi from "joi"

const validator = createValidator()
 
class CommonValidator{
     checkIdParam(){
        return validator.params(
            Joi.object({
                id: Joi.number().required()
            })  
        )      
    }
}

export default new CommonValidator() 