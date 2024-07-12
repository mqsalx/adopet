import { Repository } from "typeorm"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterInterface from "./interfaces/AdopterInterface.js"
import AddressEntity from "../entities/AddressEntity.js"


export default class AdopterRepo implements AdopterInterface {

    private repository: Repository<AdopterEntity>

    constructor(repository: Repository<AdopterEntity>) {
        this.repository = repository
    }

    create(adopter: AdopterEntity): void {
        this.repository.save(adopter);
    }

    async list(): Promise<AdopterEntity[]> {
        return await this.repository.find();
    }

    async update(
        id: number,
        newData: AdopterEntity
    ): Promise<{ success: boolean; message?: string}> {

        try {

            const adopterToUpdate = await this.repository.findOne({ where: { id } })

            if (!adopterToUpdate) {
                return { success: false, message: "Adopter not found" }
            }

            Object.assign(adopterToUpdate, newData)

            await this.repository.save(adopterToUpdate)

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

            const adopterToDestroy = await this.repository.findOne({ where: { id } })

            if (!adopterToDestroy) {
                return { success: false, message: "Adopter not found" }
            }

            await this.repository.remove(adopterToDestroy)

            return { success: true }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Internal server error"
            }
        }
    }

    async updateAdopterAddress(
        id: number,
        address: AddressEntity
    ): Promise<{ success: boolean; message?: string }> {
        console.log("aqui")
        const adopterToUpdate = await this.repository.findOne({ where: { id } })

        console.log(adopterToUpdate)

        if (!adopterToUpdate) {
            return { success: false, message: "Adopter not found" }
        }

        const newAddress = new AddressEntity(address.city, address.state)

        adopterToUpdate.address = newAddress

        await this.repository.save(adopterToUpdate)

        return { success: true }
    }



}