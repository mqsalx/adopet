import AddressEntity from "../../entities/AddressEntity.js";
import AdopterEntity from "../../entities/AdopterEntity.js"

export default interface AdopterInterface {

  create(adopter: AdopterEntity): void | Promise<void>

  list(): AdopterEntity[] | Promise<AdopterEntity[]>

  update(
    id: number,
    pet: AdopterEntity
  ): void

  destroy(id: number): void

  updateAdopterAddress(
    id: number,
    address: AddressEntity
  ): void

}