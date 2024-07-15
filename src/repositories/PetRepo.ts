import { Repository } from "typeorm"
import PetEntity from "../entities/PetEntity.js"
import PetInterface from "./interfaces/PetInterface.js"
import AdopterEntity from "../entities/AdopterEntity.js"
import EnumSize from "../enum/EnumSize.js"


export default class PetRepo implements PetInterface {

    private petRepository: Repository<PetEntity>
    private adopterRepository: Repository<AdopterEntity>

    constructor(
        petRepository: Repository<PetEntity>,
        adopterRepository: Repository<AdopterEntity>
    ) {
        this.petRepository = petRepository
        this.adopterRepository = adopterRepository
    }

    create(pet: PetEntity): void {
        this.petRepository.save(pet)
    }

    async list(): Promise<PetEntity[]> {
        return await this.petRepository.find()
    }

    async update(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string}> {

        try {

            const petToUpdate = await this.petRepository.findOne({ where: { id } })

            if (!petToUpdate) {
                return { success: false, message: "Pet not found" }
            }

            Object.assign(petToUpdate, newData)

            await this.petRepository.save(petToUpdate)

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
    ): Promise<{ success: boolean; message?: string}> {

        try {

            const petToDestroy = await this.petRepository.findOne({ where: { id } })

            if (!petToDestroy) {
                return { success: false, message: "Pet not found" }
            }

            Object.assign(petToDestroy)

            await this.petRepository.remove(petToDestroy)

            return { success: true }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }

    async adoptPet(
        pet_id: number,
        adopter_id: number
    ): Promise<{ success: boolean; message?: string }> {

        try {


            const pet = await this.petRepository.findOne({ where: { id: pet_id } })

            if (!pet) {
                return { success: false, message: "Pet not found" }
            }

            const adopter = await this.adopterRepository.findOne({ where: { id: adopter_id } })

            if (!adopter) {
                return { success: false, message: "Adopter not found" }
            }

            pet.adopter = adopter
            pet.adopt = true

            await this.petRepository.save(pet)

            return { success: true }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }

    async listPetSize(size: EnumSize): Promise<PetEntity[]> {

        const pets = await this.petRepository.find({ where: { size } })

        return pets
    }

}