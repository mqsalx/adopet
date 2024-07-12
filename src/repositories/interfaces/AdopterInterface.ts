import AdopterEntity from "../../entities/AdopterEntity.js"

export default interface AdopterInterface {
    create(adopter: AdopterEntity):void
    // list(): AdopterEntity[] | Promise<AdopterEntity[]>
    // update(id: number,adopter: AdopterEntity):void
    // destroy(id: number,adopter: AdopterEntity):void
  }