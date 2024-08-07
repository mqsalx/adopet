import * as yup from "yup"
import { TypeReqBodyAdopter } from "../../types/typeAdopter.js"
import { NextFunction, Request, Response } from "express"
import errorHandlerYup from "../../utils/errorHandlerYup.js"


const schemaBodyAdopter: yup.ObjectSchema<Omit<TypeReqBodyAdopter, "address">> = yup.object({
    name: yup.string().defined().required(),
    password: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Invalid password!"),
    phone: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Phone number is not valid!"),
    img_profile: yup.string().optional()
})

const middlewareValidatorBodyAdopter = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    errorHandlerYup(schemaBodyAdopter, req, res, next)
}

export { middlewareValidatorBodyAdopter }