import * as yup from "yup"
import { NextFunction, Request, Response } from "express"
import errorHandlerYup from "../../utils/errorHandlerYup.js"
import { TypeReqBodyAnimalShelter } from "../../types/typeAnimalShelter.js"


const schemaBodyAnimalShelter: yup.ObjectSchema<Omit<TypeReqBodyAnimalShelter, "address">> = yup.object({
    name: yup.string().defined().required(),
    password: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Invalid password!"),
    phone: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Phone number is not valid!"),
    email: yup.string().email().defined().required()
})

const middlewareValidatorBodyAnimalShelter = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    errorHandlerYup(schemaBodyAnimalShelter, req, res, next)
}

export { middlewareValidatorBodyAnimalShelter }