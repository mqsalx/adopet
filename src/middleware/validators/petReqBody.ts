import * as yup from "yup"
import { TypeReqBodyPet } from "../../types/typePet.js"
import { NextFunction, Request, Response } from "express"
import EnumSpecies from "../../enum/EnumSpecies.js"
import EnumSize from "../../enum/EnumSize.js"
import errorHandlerYup from "../../utils/errorHandlerYup.js"


const schemaBodyPet: yup.ObjectSchema<Omit<TypeReqBodyPet, "adopter" | "animalShelter">> = yup.object({
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
    errorHandlerYup(schemaBodyPet, req, res, next)
}

export { middlewareValidatorBodyPet }