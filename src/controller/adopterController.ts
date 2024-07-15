import { Request, Response } from "express"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterRepo from "../repositories/AdopterRepo.js"
import AddressEntity from "../entities/AddressEntity.js"
import { TypeReqBodyAdopter, TypeResBodyAdopter } from "../types/typeAdopter.js"


export default class AdopterController {

  constructor(
    private repository: AdopterRepo
  ) {}

  async create(req: Request<{}, {}, TypeReqBodyAdopter>, res: Response<TypeResBodyAdopter>) {

      try {
        const { name, password, img_profile, phone, address } = req.body as AdopterEntity

        const newAdopter = new AdopterEntity(
          name,
          password,
          phone,
          img_profile,
          address
        )

        this.repository.create(newAdopter);
        return res.status(201).json({ data: { id: newAdopter.id, name, phone } });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
  }

  async list(req: Request, res: Response) {
    const listAdopters = await this.repository.list()
    return res.status(200).json(listAdopters)
  }

  async update(req: Request, res: Response) {

    const { id } = req.params

    const { success, message } = await this.repository.update(
      Number(id),
      req.body as AdopterEntity
    )

    if (!success) {
      return res.status(404).json({ message})
    }

    return res.sendStatus(200)
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params

    const { success, message } = await this.repository.destroy(Number(id))

    if (!success) {
      return res.status(404).json({ message })
    }

    return res.sendStatus(204)
  }

  async updateAdopterAddress(req: Request, res: Response) {

    const { id } = req.params
    console.log("Controller")

    const { success, message } = await this.repository.updateAdopterAddress(
      Number(id),
      req.body as AddressEntity
      )

    if (!success) {
      return res.status(404).json({ message })
    }

    return res.sendStatus(204)
  }

}