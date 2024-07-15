import AdopterEntity from "../entities/AdopterEntity.js"

type TypeReqBodyAdopter = Omit<AdopterEntity, "id">
type TypeReqParamsAdopter ={ id?:string }
type TypeResBodyAdopter = {
    data?:
        | Pick<AdopterEntity, "id" | "name" | "phone">
        | Pick<AdopterEntity, "id" | "name" | "phone">[]
    error?: unknown
}

export { TypeReqBodyAdopter, TypeResBodyAdopter, TypeReqParamsAdopter }