import { Request, Response } from "express"
import EnumSpecies from "../enum/EnumSpecies.js"
import PetRepo from "../repositories/PetRepo.js"
import PetEntity from "../entities/PetEntity.js"
import EnumSize from "../enum/EnumSize.js"
import { TypeReqBodyPet, TypeReqParamsPet, TypeResBodyPet } from "../types/typePet.js"

export default class PetController {

    constructor(
        private repository: PetRepo
    ){}

    async create(req:Request<TypeReqParamsPet, {}, TypeReqBodyPet>, res:Response<TypeResBodyPet>){

        try {
            const {
                name,
                species,
                age,
                adopt,
                size
            } = req.body as PetEntity

            if(!Object.values(EnumSpecies).includes(species as EnumSpecies) ) {
                return res.status(400)
                    .json({ message: "Invalid Species" })
            }

            if(size && !(size in EnumSize) ) {
                return res.status(400)
                    .json({ message: "Invalid size" })
            }

            const newPet = new PetEntity(
                name,
                species,
                age,
                adopt,
                size
            )

            this.repository.create(newPet)

            return res.status(201).json({ data: { id: newPet.id, name, species, size }})
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }

    }

    async list(
        req: Request<TypeReqParamsPet, {}, TypeReqBodyPet>,
        res: Response<TypeResBodyPet>
    ) {
        const listPets = await this.repository.list()
        const data = listPets.map((pets) => {
            return {
              id: pets.id,
              name: pets.name,
              species: pets.species,
              size: pets.size
            }
          })
        return res.status(200).json({ data })
    }

    async update(
        req: Request<TypeReqParamsPet, {}, TypeReqBodyPet>,
        res: Response<TypeResBodyPet>
    ) {

        const { id } = req.params

        const { success, message } = await this.repository.update(
            Number(id),
            req.body as PetEntity
        )

        if (!success) {
            return res.status(404).json({ message })
        }

        return res.sendStatus(204)

    }

    async destroy(req: Request<TypeReqParamsPet, {}, TypeReqBodyPet>, res: Response<TypeResBodyPet>) {

        const { id } = req.params

        const { success, message } = await this.repository.destroy(Number(id))

        if (!success) {
            return res.status(404).json({ message })
        }

        return res.sendStatus(204)

    }

    async adoptPet(req: Request<TypeReqParamsPet, {}, TypeReqBodyPet>, res: Response<TypeResBodyPet>) {

        const { pet_id, adopter_id } = req.params

        const { success, message } = await this.repository.adoptPet(
            Number(pet_id),
            Number(adopter_id)
        )

        if (!success) {
            return res.status(404).json({ message })
        }

        return res.sendStatus(204)
    }

    async listGenerics(req: Request, res: Response) {

        const { key, value } = req.query
        const listPets = await this.repository.listGenerics(
            key as keyof PetEntity,
            value as string
        )

        return res.status(200).json(listPets)

    }

}