import express from "express"
import PetController from "../controller/petController.js"

const router = express.Router()

const petController = new PetController

router.post("/", petController.createPet)

export default router