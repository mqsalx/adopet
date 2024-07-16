import { Repository } from "typeorm"
import AnimalShelterEntity from "../entities/AnimalShelterEntity.js"
import AnimalShelterInterface from "./interfaces/AnimalShelterInterface.js"
import AddressEntity from "../entities/AddressEntity.js"
import { NotFound, BadRequest } from "../utils/errorHandler.js"

export default class AnimalShelterRepo implements AnimalShelterInterface {

  constructor(
    private repository: Repository<AnimalShelterEntity>
  ) {}

  private async checkAnimalShelterPhone(phone: string) {
    return !!(await this.repository.findOne({ where: { phone } }))
  }

  private async checkAnimalShelterEmail(email: string) {
    return !!(await this.repository.findOne({ where: { email } }))
  }

  async create(animalShelter: AnimalShelterEntity): Promise<void> {
    if (
      await this.checkAnimalShelterPhone(animalShelter.phone) || await this.checkAnimalShelterEmail(animalShelter.email)
    ) {
      throw new BadRequest("Phone already exists or Email already exists")
    }
    await this.repository.save(animalShelter)
  }

  async list(): Promise<AnimalShelterEntity[]> {
    return await this.repository.find()
  }

  async update(id: number, newData: AnimalShelterEntity) {

    const animalShelterToUpdate  = await this.repository.findOne({ where: { id } })

    if (!animalShelterToUpdate) {
      throw new NotFound("Animal Shelter not found")
    }

    Object.assign(animalShelterToUpdate, newData)

    await this.repository.save(animalShelterToUpdate)

    return { success: true }
  }

  async destroy(id: number) {

    const animalShelterToDestroy = await this.repository.findOne({ where: { id } })

    if (!animalShelterToDestroy) {
      throw new NotFound("Animal Shelter not found")
    }

    await this.repository.remove(animalShelterToDestroy)

    return { success: true }
  }

  async updateAnimalShelterAddress(
    id: number,
    address: AddressEntity
  ) {
    const animalShelter = await this.repository.findOne({
      where: { id: id },
    });

    if (!animalShelter) {
      throw new NotFound("Animal Shelter not found")
    }

    const newAddress = new AddressEntity(address.city, address.state)
    animalShelter.address = newAddress
    await this.repository.save(animalShelter)
    return { success: true }
  }
}