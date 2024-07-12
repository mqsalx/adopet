import { Request, Response } from "express"
import type TypePet from "../types/typePet.js"
import EnumSpecies from "../enum/EnumSpecies.js"
import PetRepo from "../repositories/PetRepo.js"
import PetEntity from "../entities/PetEntity.js"


let listPets: TypePet [] = []

let id = 0
function genId() {
  id = id + 1;
  return id;
}

export default class PetController {

    constructor(
        private repository: PetRepo
    ){}

    async create(req:Request, res:Response){

        const {
            name,
            species,
            adopt,
            age
        } = req.body as PetEntity

        if(!Object.values(EnumSpecies).includes(species as EnumSpecies) ) {
            return res.status(400)
                .json({ message: "Invalid Species" })
        }

        const newPet = new PetEntity(
            name,
            species,
            adopt,
            age
        )

        this.repository.create(newPet)

        return res.status(201).json(newPet)

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

        const { success, message } = await this.repository.destroy(
            Number(id),
            req.body as PetEntity
        )

        if (!success) {
            return res.status(404).json({ message })
        }

        return res.sendStatus(204)

    }
}