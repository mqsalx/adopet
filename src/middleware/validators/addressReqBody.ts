import * as yup from "yup"
import { TypeReqBodyAdopter } from "../../types/typeAdopter.js"
import { NextFunction, Request, Response } from "express"
import AddressEntity from "../../entities/AddressEntity.js"


const schemaBodyAddress: yup.Schema<Omit<AddressEntity, "id">> = yup.object({
    city: yup.string().required(),
    state: yup.string().required().min(6),
  })

const middlewareValidatorBodyAddress = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

    await schemaBodyAddress.validate(req.body, {
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

export { middlewareValidatorBodyAddress }