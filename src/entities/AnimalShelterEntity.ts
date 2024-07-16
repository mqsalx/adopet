import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import AddressEntity from "./AddressEntity.js"
import PetEntity from "./PetEntity.js"
import { createHashPassword } from "../utils/hashPassword.js"


@Entity()
export default class AnimalShelterEntity {
    @PrimaryGeneratedColumn()
        id!: number
        @Column()
        name: string
        @Column()
        password: string
        @Column({ unique: true })
        phone: string
        @Column({ unique: true })
        email: string

        @OneToOne(() => AddressEntity, { nullable: true, cascade: true, eager: true })
        @JoinColumn()
        address?: AddressEntity

        @OneToMany(() => PetEntity, (pet) => pet.animalShelter)
        pets!: PetEntity[]

    constructor(
        name: string,
        password: string,
        phone: string,
        email: string,
        address?: AddressEntity
    ) {
        this.name = name
        this.password = password
        this.phone = phone
        this.email = email
        this.address = address
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(password: string) {
        this.password = createHashPassword(this.password)
    }
}