import express from "express";
import router from "./routes/index.js";
import "reflect-metadata"
import { AppDataSource } from "./config/dataSource.js";


const app = express();
app.use(express.json());

router(app)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error)
    })



export default app;
