import { Request, Response } from "express"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterRepo from "../repositories/AdopterRepo.js"
import AddressEntity from "../entities/AddressEntity.js"
import { TypeReqBodyAdopter, TypeReqParamsAdopter, TypeResBodyAdopter } from "../types/typeAdopter.js"


export default class AdopterController {

  constructor(
    private repository: AdopterRepo
  ) {}

  async create(
    req: Request<TypeReqParamsAdopter, {}, TypeReqBodyAdopter>,
    res: Response<TypeResBodyAdopter>
  ){

    const { name, password, img_profile, phone, address } = req.body as AdopterEntity

    const newAdopter = new AdopterEntity(
      name,
      password,
      phone,
      img_profile,
      address
    )

    await this.repository.create(newAdopter)

    return res.status(201).json({ data: { id: newAdopter.id, name, phone, address } })
  }

  async list(
    req: Request<TypeReqParamsAdopter, {}, TypeReqBodyAdopter>,
    res: Response<TypeResBodyAdopter>
  ) {
    const listAdopters = await this.repository.list()
    const data = listAdopters.map((adopter) => {
      return {
        id: adopter.id,
        name: adopter.name,
        phone: adopter.phone,
        address: adopter.address !== null ? adopter.address : undefined
      }
    })

    return res.json({ data })
  }

  async update(
    req: Request<TypeReqParamsAdopter, {}, TypeReqBodyAdopter>,
    res: Response<TypeResBodyAdopter>
  ) {

    const { id } = req.params


    await this.repository.update(
      Number(id),
      req.body as AdopterEntity
    )

    return res.sendStatus(200)
  }

  async destroy(
    req: Request<TypeReqParamsAdopter,{}, TypeReqBodyAdopter>,
    res: Response<TypeResBodyAdopter>
  ) {
    const { id } = req.params

    await this.repository.destroy(Number(id))

    return res.sendStatus(204)
  }

  async updateAdopterAddress(
    req: Request<TypeReqParamsAdopter,{}, AddressEntity>,
    res: Response<TypeResBodyAdopter>
  ) {

    const { id } = req.params

    await this.repository.updateAdopterAddress(
      Number(id),
      req.body
    )

    return res.sendStatus(204)
  }

}