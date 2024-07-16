import AdopterEntity from "../entities/AdopterEntity.js"

type TypeReqBodyAdopter = Omit<AdopterEntity, "id"| "pets">

type TypeReqParamsAdopter ={ id?: string }

type TypeResBodyAdopter = {
    data?:
    | Pick<AdopterEntity, "id" | "name" | "phone" | "address">
    | Pick<AdopterEntity, "id" | "name" | "phone" | "address">[]
}

export {
    TypeReqBodyAdopter,
    TypeResBodyAdopter,
    TypeReqParamsAdopter
}