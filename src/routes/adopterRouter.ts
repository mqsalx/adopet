import express, { RequestHandler } from "express"
import AdopterController from "../controller/adopterController.js"
import AdopterRepo from "../repositories/AdopterRepo.js"
import { AppDataSource } from "../config/dataSource.js"
import { middlewareValidatorBodyAddress } from "../middleware/validators/addressReqBody.js"
import { middlewareValidatorBodyAdopter } from "../middleware/validators/adopterReqBody.js"

const router = express.Router();
const adopterRepo = new AdopterRepo(
  AppDataSource.getRepository("AdopterEntity")
);
const adopterController = new AdopterController(adopterRepo);
const validateBodyAdopter:RequestHandler = (req, res, next) => middlewareValidatorBodyAdopter(req, res, next)
const validateBodyAddress:RequestHandler = (req, res, next) => middlewareValidatorBodyAddress(req, res, next)

router.post("/", validateBodyAdopter, (req, res) => adopterController.create(req, res))
router.get("/", (req, res) => adopterController.list(req, res))
router.put("/:id", (req, res) => adopterController.update(req, res))
router.delete("/:id", (req, res) => adopterController.destroy(req, res))
router.patch("/:id", validateBodyAddress, (req, res) => adopterController.updateAdopterAddress(req, res))

export default router