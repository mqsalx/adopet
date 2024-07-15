import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../enum/EnumSpecies.js";
import AdopterEntity from "./AdopterEntity.js";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name: string
    @Column()
    species: EnumSpecies
    @Column({ type: 'date' })
    age: string
    @Column()
    adopt: boolean
    @ManyToOne(() => AdopterEntity, (adopter) => adopter.pets)
    adopter!: AdopterEntity

    constructor(
        name: string,
        species: EnumSpecies,
        age: string,
        adopt: boolean
    ){
        this.name = name
        this.species = species
        this.age = age
        this.adopt = adopt
    }
}