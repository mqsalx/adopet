import PetEntity from "../entities/PetEntity.js"

type TypeReqBodyPet = Omit<PetEntity, "id">

type TypeReqParamsPet = { id?:string, pet_id?:string, adopter_id?:string }

type TypeResBodyPet = {
    data?:
    | Pick<PetEntity, "id" | "name" | "species" | "size">
    | Pick<PetEntity, "id" | "name" | "species" | "size">[]
}

export { TypeReqBodyPet, TypeResBodyPet, TypeReqParamsPet }