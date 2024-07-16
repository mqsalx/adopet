import express  from "express"
import petRouter from "../routes/petRouter.js"
import adopterRouter from "../routes/adopterRouter.js"
import animalShelterRouter from "../routes/animalShelterRouter.js"


const router = (app: express.Router) => {
    app.use("/pets", petRouter)
    app.use("/adopters", adopterRouter)
    app.use("/animalShelters", animalShelterRouter)
}

export default router