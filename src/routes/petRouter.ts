import express, { RequestHandler } from "express"
import PetController from "../controller/petController.js"
import PetRepo from "../repositories/PetRepo.js"
import { AppDataSource } from "../config/dataSource.js"
import { middlewareValidatorBodyPet } from "../middleware/validators/petReqBody.js"


const petRouter = express.Router()

const petRepository = new PetRepo(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdopterEntity")
)

const petController = new PetController(petRepository)
const validateBodyPet:RequestHandler = (req, res, next) => middlewareValidatorBodyPet(req, res, next)

petRouter.post("/", validateBodyPet, (req, res) => petController.create(req, res))
petRouter.get("/", (req, res) => petController.list(req, res))
petRouter.put("/:id", (req, res) => petController.update(req, res))
petRouter.delete("/:id", (req, res) => petController.destroy(req, res))
petRouter.put("/:pet_id/:adopter_id", (req, res) => petController.adoptPet(req, res))
petRouter.get("/filter", (req, res) => petController.listGenerics(req, res))

export default petRouter