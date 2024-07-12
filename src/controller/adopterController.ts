import { Request, Response } from "express"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterRepo from "../repositories/AdopterRepo.js"


export default class AdopterController {

  constructor(
    private repository: AdopterRepo
  ) {}

  async create(req: Request, res: Response) {

      try {
        const { name, password, img_profile, phone, address } = req.body as AdopterEntity

        const newAdopter = new AdopterEntity(
          name,
          password,
          phone,
          img_profile,
          address
        )

        await this.repository.create(newAdopter);
        return res.status(201).json(newAdopter);
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
  }
}