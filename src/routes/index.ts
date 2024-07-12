import express  from "express"
import petRouter from "../routes/petRouter.js"
import adopterRouter from "../routes/adopterRouter.js"


const router = (app: express.Router) => {
    app.use("/pets", petRouter)
    app.use("/adopters", adopterRouter)
}

export default router