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

export default router;