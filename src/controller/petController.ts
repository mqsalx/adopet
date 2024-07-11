import { Request, Response } from "express"
import type TypePet from "../types/typePet.js"
import EnumSpecies from "../enum/EnumSpecies.js"


let listPets: TypePet [] = []

export default class PetController {

    create(req:Request, res:Response){

        const {
            id,
            name,
            species,
            adopt,
            age
        } = req.body as TypePet

        if(!Object.values(EnumSpecies).includes(species as EnumSpecies) ) {
            return res.status(400).json({ message: "Invalid Species" })
        }

        const createdPet: TypePet = {
            id,
            name,
            species,
            adopt,
            age
        }

        listPets.push(createdPet)

        return res.status(201).json(createdPet)

    }

    list(req: Request, res: Response) {
        return res.status(200).json(listPets)
    }

    update(req: Request, res: Response) {

        const { id } = req.params
        const { name, species, adopt, age } = req.body as TypePet
        const pet = listPets.find((pet) => pet.id === Number(id))

        if (!pet) {
            return res.status(404).json({ message: "Pet not found." })
        }

        pet.name = name
        pet.species = species
        pet.adopt = adopt
        pet.age = age

        return res.status(200).json(pet)

    }

    destroy(req: Request, res: Response) {

        const { id } = req.params
        const pet = listPets.find((pet) => pet.id === Number(id))

        if(!pet) {
            return res.status(404).json({ message: "Pet not found." })
        }

        const index = listPets.indexOf(pet)
        listPets.splice(index, 1)
        return res.status(200).json({ message: "Pet successfully deleted!" })


    }
}