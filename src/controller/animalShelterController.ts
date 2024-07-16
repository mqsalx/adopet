import { Request, Response } from "express"
import AnimalShelterRepo from "../repositories/AnimalShelterRepo.js"
import AnimalShelterEntity from "../entities/AnimalShelterEntity.js"
import { TypeReqBodyAnimalShelter, TypeReqParamsAnimalShelter, TypeResBodyAnimalShelter } from "../types/typeAnimalShelter.js"
import AddressEntity from "../entities/AddressEntity.js"
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode.js"


export default class AnimalShelterController {

  constructor(
    private repository: AnimalShelterRepo
  ) {}

  async create(
    req: Request<TypeReqParamsAnimalShelter, {}, TypeReqBodyAnimalShelter>,
    res: Response<TypeResBodyAnimalShelter>
  ){

    const { name, password, phone, email, address } = req.body as AnimalShelterEntity

    const newAnimalShelter = new AnimalShelterEntity(
      name,
      password,
      phone,
      email,
      address
    )

    await this.repository.create(newAnimalShelter)

    return res.status(201).json({ data: { id: newAnimalShelter.id, name, phone, email, address } })
  }

  async list(
    req: Request<TypeReqParamsAnimalShelter, {}, TypeReqBodyAnimalShelter>,
    res: Response<TypeResBodyAnimalShelter>
  ) {
    const listAnimalShelter = await this.repository.list()
    const data = listAnimalShelter.map((animalShelter) => {
      return {
        id: animalShelter.id,
        name: animalShelter.name,
        phone: animalShelter.phone,
        email: animalShelter.email,
        address: animalShelter.address !== null ? animalShelter.address : undefined
      }
    })

    return res.json({ data })
  }

  async update(
    req: Request<TypeReqParamsAnimalShelter, {}, TypeReqBodyAnimalShelter>,
    res: Response<TypeResBodyAnimalShelter>
  ) {

    const { id } = req.params


    await this.repository.update(
      Number(id),
      req.body as AnimalShelterEntity
    )

    return res.sendStatus(200)
  }

  async destroy(
    req: Request<TypeReqParamsAnimalShelter, {}, TypeReqBodyAnimalShelter>,
    res: Response<TypeResBodyAnimalShelter>
  ) {
    const { id } = req.params

    await this.repository.destroy(Number(id))

    return res.sendStatus(EnumHttpStatusCode.OK)
  }

  async updateAnimalShelterAddress(
    req: Request<TypeReqParamsAnimalShelter, {}, AddressEntity>,
    res: Response<TypeResBodyAnimalShelter>
  ) {

    const { id } = req.params

    await this.repository.updateAnimalShelterAddress(
      Number(id),
      req.body
    )

    return res.sendStatus(EnumHttpStatusCode.OK)
  }

}