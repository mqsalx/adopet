import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../enum/EnumSpecies.js";
import AdopterEntity from "./AdopterEntity.js";
import EnumSize from "../enum/EnumSize.js";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name: string
    @Column()
    species: EnumSpecies
    @Column({ nullable: true })
    size?: EnumSize
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
        adopt: boolean,
        size?: EnumSize
    ){
        this.name = name
        this.species = species
        this.age = age
        this.adopt = adopt
        this.size = size
    }
}