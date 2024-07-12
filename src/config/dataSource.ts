import { DataSource } from "typeorm"
import PetEntity from "../entities/PetEntity.js"
import AdopterEntity from "../entities/AdopterEntity.js"
import AddressEntity from "../entities/AddressEntity.js"

export const AppDataSource = new DataSource({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username: "adopet",
    password: "admin",
    database: "db_adopet",
    entities: [
        PetEntity,
        AdopterEntity,
        AddressEntity
    ],
    synchronize: true
})