import { Request, Response } from "express"
import type TypePet from "../types/typePet.js"
import EnumSpecies from "../enum/EnumSpecies.js"
import PetRepo from "../repositories/PetRepo.js"
import PetEntity from "../entities/PetEntity.js"
import EnumSize from "../enum/EnumSize.js"

export default class PetController {

    constructor(
        private repository: PetRepo
    ){}

    async create(req:Request, res:Response){

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

            return res.status(201).json(newPet)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }

    }

    async list(req: Request, res: Response) {
        const listPets = await this.repository.list()
        return res.status(200).json(listPets)
    }

    async update(req: Request, res: Response) {

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

    async destroy(req: Request, res: Response) {

        const { id } = req.params

        const { success, message } = await this.repository.destroy(Number(id))

        if (!success) {
            return res.status(404).json({ message })
        }

        return res.sendStatus(204)

    }

    async adoptPet(req: Request, res: Response) {

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

    async listPetSize(req: Request, res: Response) {

        const { size } = req.query
        const listPets = await this.repository.listPetSize(size as EnumSize)
        return res.status(200).json(listPets)
    }
}