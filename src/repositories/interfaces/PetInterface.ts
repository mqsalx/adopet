import PetEntity from "../../entities/PetEntity.js"
import EnumSize from "../../enum/EnumSize.js";

export default interface PetInterface {

  create(pet: PetEntity): void | Promise<void>

  list(): PetEntity[] | Promise<PetEntity[]>

  update(
    id: number,
    pet: PetEntity
  ): void

  destroy(id: number): void

  adoptPet(pet_id: number, adopter_id: number): void

  listGenerics<Type extends keyof PetEntity>(
    key: Type, value: PetEntity[Type]
  ): Promise<PetEntity[]> | PetEntity[]

}