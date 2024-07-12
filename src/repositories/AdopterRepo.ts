import { Repository } from "typeorm"
import AdopterEntity from "../entities/AdopterEntity.js"
import AdopterInterface from "./interfaces/AdopterInterface.js"


export default class AdopterRepo implements AdopterInterface {

    private repository: Repository<AdopterEntity>

    constructor(repository: Repository<AdopterEntity>) {
        this.repository = repository
    }

    async create(adopter: AdopterEntity): Promise<void> {
        await this.repository.save(adopter);
    }

}