import AddressEntity from "../../entities/AddressEntity.js";
import AnimalShelterEntity from "../../entities/AnimalShelterEntity.js"

export default interface AnimalShelterInterface {

  create(adopter: AnimalShelterEntity): void | Promise<void>

  list(): AnimalShelterEntity[] | Promise<AnimalShelterEntity[]>

  update(
    id: number,
    pet: AnimalShelterEntity
  ): void

  destroy(id: number): void

  updateAnimalShelterAddress(
    id: number,
    address: AddressEntity
  ): void

}