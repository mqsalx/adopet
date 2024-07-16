import * as yup from "yup"
import { NextFunction, Request, Response } from "express"
import AddressEntity from "../../entities/AddressEntity.js"
import errorHandlerYup from "../../utils/errorHandlerYup.js"


const schemaBodyAddress: yup.ObjectSchema<Omit<AddressEntity,"id">> = yup.object({
    city: yup.string().defined().required(),
    state: yup.string().defined().required()
  })

const middlewareValidatorBodyAddress = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    errorHandlerYup(schemaBodyAddress, req, res, next)
}

export { middlewareValidatorBodyAddress }