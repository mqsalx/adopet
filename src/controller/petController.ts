import { Request, Response } from "express";

let listPets = []

export default class PetController {
    createPet(req:Request, res:Response){

        const newPet = req.body
        listPets.push(newPet)
        return res.status(201).json(newPet)

    }
}