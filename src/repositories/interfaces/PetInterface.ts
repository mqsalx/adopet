import PetEntity from "../../entities/PetEntity.js"

export default interface PetInterface {
    create(pet: PetEntity):void
    list(): PetEntity[] | Promise<PetEntity[]>
    update(id: number,pet: PetEntity):void
    destroy(id: number,pet: PetEntity):void
}