import express from "express"
import PetController from "../controller/petController.js"


const petRouter = express.Router()

const petController = new PetController()

petRouter.post("/", petController.create)
petRouter.get("/",petController.list)
petRouter.put("/:id", petController.update)
petRouter.delete("/:id", petController.destroy)

export default petRouter