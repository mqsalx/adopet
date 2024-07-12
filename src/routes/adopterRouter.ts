import express from "express";
import AdopterController from "../controller/adopterController.js";
import AdopterRepo from "../repositories/AdopterRepo.js";
import { AppDataSource } from "../config/dataSource.js";

const router = express.Router();
const adopterRepo = new AdopterRepo(
  AppDataSource.getRepository("AdopterEntity")
);
const adopterController = new AdopterController(adopterRepo);

router.post("/", (req, res) => adopterController.create(req, res))
router.get("/", (req, res) => adopterController.list(req, res))
router.put("/:id", (req, res) => adopterController.update(req, res))
router.delete("/:id", (req, res) => adopterController.destroy(req, res))

export default router;