import AnimalShelterEntity from "../entities/AnimalShelterEntity.js"

type TypeReqBodyAnimalShelter = Omit<AnimalShelterEntity, "id"| "pets">

type TypeResBodyAnimalShelter = {
    data?:
    | Pick<AnimalShelterEntity, "id" | "name" | "phone" | "email" | "address">
    | Pick<AnimalShelterEntity, "id" | "name" | "phone" | "email" | "address">[]
}

type TypeReqParamsAnimalShelter ={ id?: string }

export {
    TypeReqBodyAnimalShelter,
    TypeResBodyAnimalShelter,
    TypeReqParamsAnimalShelter
}