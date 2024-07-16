import { Repository } from "typeorm"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterInterface from "./interfaces/AdopterInterface.js"
import AddressEntity from "../entities/AddressEntity.js"
import { NotFound, BadRequest } from "../utils/errorHandler.js"

export default class AdopterRepo implements AdopterInterface {

  constructor(
    private repository: Repository<AdopterEntity>
  ) {}

  private async checkAdopterPhone(phone: string) {
    return await this.repository.findOne({ where: { phone } })
  }

  async create(adopter: AdopterEntity): Promise<void> {
    if (await this.checkAdopterPhone(adopter.phone)) {
      throw new BadRequest("Phone already exists")
    }
    await this.repository.save(adopter)
  }

  async list(): Promise<AdopterEntity[]> {
    return await this.repository.find()
  }

  async update(id: number, newData: AdopterEntity) {

    const adopterToUpdate  = await this.repository.findOne({ where: { id } })

    if (!adopterToUpdate) {
      throw new NotFound("Adopter not found")
    }

    Object.assign(adopterToUpdate, newData)

    await this.repository.save(adopterToUpdate)

    return { success: true }
  }

  async destroy(id: number) {

    const adopterToDestroy = await this.repository.findOne({ where: { id } })

    if (!adopterToDestroy) {
      throw new NotFound("Adopter not found")
    }

    await this.repository.remove(adopterToDestroy)

    return { success: true }
  }

  async updateAdopterAddress(id: number, address: AddressEntity) {
    const adopter = await this.repository.findOne({
      where: { id: id },
    });

    if (!adopter) {
      throw new NotFound("Adopter not found")
    }

    const newAddress = new AddressEntity(address.city, address.state)
    adopter.address = newAddress
    await this.repository.save(adopter)
    return { success: true }
  }
}