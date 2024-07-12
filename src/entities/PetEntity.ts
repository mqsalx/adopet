import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecies from "../enum/EnumSpecies.js";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    name: string
    @Column()
    species: EnumSpecies
    @Column()
    adopt: boolean
    @Column({ type: 'date' })
    age: string

    constructor(
        name: string,
        species: EnumSpecies,
        adopt: boolean,
        age: string
    ){
        this.name = name
        this.species = species
        this.adopt = adopt
        this.age = age
    }
}