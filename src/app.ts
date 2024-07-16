import express from "express"
import "express-async-errors"
import router from "./routes/index.js"
import "reflect-metadata"
import { AppDataSource } from "./config/dataSource.js"
import { errorMiddleware } from "./middleware/error.js"


const app = express()

app.use(express.json())

router(app)

app.get("/error", () =>{
    throw new Error("Error")
})

app.use(errorMiddleware)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error)
    })



export default app;
