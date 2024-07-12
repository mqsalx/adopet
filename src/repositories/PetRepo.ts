import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity.js";
import PetInterface from "./interfaces/PetInterface.js";

export default class PetRepo implements PetInterface {

    private repository: Repository<PetEntity>

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository
    }

    create(pet: PetEntity): void {
        this.repository.save(pet)
    }

    async list(): Promise<PetEntity[]> {
        return await this.repository.find()
    }

    async update(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string}> {

        try {

            const petToUpdate = await this.repository.findOne({ where: { id } })

            if (!petToUpdate) {
                return { success: false, message: "Pet not found" }
            }

            Object.assign(petToUpdate, newData)

            await this.repository.save(petToUpdate)

            return { success: true }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }

    async destroy(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string}> {

        try {

            const petToDestroy = await this.repository.findOne({ where: { id } })

            if (!petToDestroy) {
                return { success: false, message: "Pet not found" }
            }

            Object.assign(petToDestroy, newData)

            await this.repository.remove(petToDestroy)

            return { success: true }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }
}