import { Repository } from "typeorm"
import PetEntity from "../entities/PetEntity.js"
import PetInterface from "./interfaces/PetInterface.js"
import AdopterEntity from "../entities/AdopterEntity.js"
import { NotFound } from "../utils/errorHandler.js"


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

    async create(pet: PetEntity): Promise<void> {
        await this.petRepository.save(pet)
    }

    async list(): Promise<PetEntity[]> {
        return await this.petRepository.find()
    }

    async update(
        id: number,
        newData: PetEntity
    ) {

        const petToUpdate = await this.petRepository.findOne({ where: { id } })

        if (!petToUpdate) {
            throw new NotFound("Pet not found")
        }

        Object.assign(petToUpdate, newData)

        await this.petRepository.save(petToUpdate)

        return { success: true }

    }

    async destroy(
        id: number,
    ) {

        const petToDestroy = await this.petRepository.findOne({ where: { id } })

        if (!petToDestroy) {
            throw new NotFound("Pet not found")
        }

        await this.petRepository.remove(petToDestroy)

        return { success: true }
    }

    async adoptPet(
        pet_id: number,
        adopter_id: number
    ){

        const pet = await this.petRepository.findOne({ where: { id: pet_id } })

        if (!pet) {
            throw new NotFound("Pet not found")
        }

        const adopter = await this.adopterRepository.findOne({ where: { id: adopter_id } })

        if (!adopter) {
            throw new NotFound("Adopter not found")
        }

        pet.adopter = adopter
        pet.adopt = true

        await this.petRepository.save(pet)

        return { success: true }
    }

    async listGenerics<Type extends keyof PetEntity>(key: Type, value: PetEntity[Type]){
        const pets = await this.petRepository.find({ where: { [key]: value } })
        return pets
    }

}