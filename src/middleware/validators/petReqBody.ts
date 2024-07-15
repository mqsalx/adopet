import * as yup from "yup"
import { TypeReqBodyPet } from "../../types/typePet.js"
import { NextFunction, Request, Response } from "express"
import EnumSpecies from "../../enum/EnumSpecies.js"
import EnumSize from "../../enum/EnumSize.js"


const schemaBodyPet: yup.Schema<Omit<TypeReqBodyPet, "adopter">> = yup.object({
    name: yup.string().defined().required(),
    species: yup.string().oneOf(Object.values(EnumSpecies)).defined().required(),
    size: yup.string().oneOf(Object.values(EnumSize)).defined().required(),
    age: yup.string().defined().required(),
    adopt: yup.boolean().defined().required(),
})

const middlewareValidatorBodyPet = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

    await schemaBodyPet.validate(req.body, {
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

export { middlewareValidatorBodyPet }