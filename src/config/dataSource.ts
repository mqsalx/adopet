import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username: "adopet",
    password: "admin",
    database: "db_adopet",
})