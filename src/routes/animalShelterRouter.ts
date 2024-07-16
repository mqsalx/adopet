import express, { RequestHandler } from "express"
import AnimalShelterRepo from "../repositories/AnimalShelterRepo.js"
import { AppDataSource } from "../config/dataSource.js"
import { middlewareValidatorBodyAddress } from "../middleware/validators/addressReqBody.js"
import { middlewareValidatorBodyAnimalShelter } from "../middleware/validators/animalShelterReqBody.js"
import { checkIdMiddleware } from "../middleware/checkId.js"
import AnimalShelterController from "../controller/animalShelterController.js"

const router = express.Router()

const animalShelter = new AnimalShelterRepo(
  AppDataSource.getRepository("AnimalShelterEntity")
)

const animalShelterController = new AnimalShelterController(animalShelter)

const validateBodyAnimalShelter:RequestHandler = (req, res, next) => middlewareValidatorBodyAnimalShelter(req, res, next)

const validateBodyAddress:RequestHandler = (req, res, next) => middlewareValidatorBodyAddress(req, res, next)

router.post("/", validateBodyAnimalShelter, (req, res) => animalShelterController.create(req, res))
router.get("/", (req, res) => animalShelterController.list(req, res))
router.put("/:id", checkIdMiddleware, (req, res) => animalShelterController.update(req, res))
router.delete("/:id", checkIdMiddleware, (req, res) => animalShelterController.destroy(req, res))
router.patch("/:id", checkIdMiddleware, validateBodyAddress, (req, res) => animalShelterController.updateAnimalShelterAddress(req, res))

export default router