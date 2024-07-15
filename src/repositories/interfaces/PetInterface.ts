import PetEntity from "../../entities/PetEntity.js"
import EnumSize from "../../enum/EnumSize.js";

export default interface PetInterface {

  create(pet: PetEntity):void

  list(): PetEntity[] | Promise<PetEntity[]>

  update(
      id: number,
      pet: PetEntity
    ): Promise<{ success: boolean; message?: string }> | void

  destroy(id: number): Promise<{ success: boolean; message?: string }> | void

  adoptPet(pet_id: number, adopter_id: number): Promise<{ success: boolean; message?: string }> | void

  listGenerics<Type extends keyof PetEntity>(key: Type, value: PetEntity[Type]): Promise<PetEntity[]> | PetEntity[]

}