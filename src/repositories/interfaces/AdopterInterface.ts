import AdopterEntity from "../../entities/AdopterEntity.js"

export default interface AdopterInterface {
    create(adopter: AdopterEntity):void
    list(): AdopterEntity[] | Promise<AdopterEntity[]>
    update(
      id: number,
      pet: AdopterEntity
    ): Promise<{ success: boolean; message?: string }> | void
    destroy(id: number): Promise<{ success: boolean; message?: string }> | void
  }