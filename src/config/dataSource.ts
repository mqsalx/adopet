import { DataSource } from "typeorm"
import PetEntity from "../entities/PetEntity.js"
import AdopterEntity from "../entities/AdopterEntity.js"
import AddressEntity from "../entities/AddressEntity.js"
import "dotenv/config"


function parsePort(port: string | undefined): number | undefined {
    if (port) {
        const parsedPort = parseInt(port, 10);
        if (!isNaN(parsedPort)) {
            return parsedPort;
        }
    }
    return undefined
}

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parsePort(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        PetEntity,
        AdopterEntity,
        AddressEntity
    ],
    synchronize: true
})