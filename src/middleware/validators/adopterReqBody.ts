import * as yup from "yup"
import { TypeReqBodyAdopter } from "../../types/typeAdopter.js"
import { NextFunction, Request, Response } from "express"


const schemaBodyAdopter: yup.Schema<Omit<TypeReqBodyAdopter, "address">> = yup.object({
    name: yup.string().defined().required(),
    password: yup.string().defined().required().min(6),
    phone: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Phone number is not valid!"),
    img_profile: yup.string().optional()
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