import * as yup from "yup"
import { TypeReqBodyAdopter, TypeReqParamsAdopter, TypeResBodyAdopter } from "../../types/typeAdopter.js"
import { NextFunction, Request, Response } from "express"


const schemaBodyAdopter: yup.Schema<Omit<TypeReqBodyAdopter, "address">> = yup.object({
    name: yup.string().required(),
    password: yup.string().required().min(6),
    img_profile: yup.string().optional(),
    phone: yup.string().required(),
  })

const middlewareValidatorBodyAdopter = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

    await schemaBodyAdopter.validate(req.body, {
        abortEarly: false
    })

    next()

    } catch (error) {
        const yupErrors = error as  yup.ValidationError
        const validationErrors:Record<string, string> = {}
        yupErrors.inner.forEach((error) => {
        if (!error.path) return
            validationErrors[error.path] = error.message
        })
        return res.status(400).json({ error: validationErrors })
    }
}

export { middlewareValidatorBodyAdopter }