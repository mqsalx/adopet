import AdopterEntity from "../entities/AdopterEntity.js"

type TypeReqBodyAdopter = Omit<AdopterEntity, "id">
type TypeResBodyAdopter = {
    data?:  Pick<AdopterEntity, "id" | "name" | "phone">
    error?: string
}

export { TypeReqBodyAdopter, TypeResBodyAdopter }