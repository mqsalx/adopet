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
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
        id!: number
        @Column()
        name: string
        @Column()
        password: string
        @Column()
        phone: string
        @Column({ nullable: true })
        img_profile?: string

        @OneToOne(() => AddressEntity, {nullable: true, cascade: true,eager: true})
        @JoinColumn()
        address?: AddressEntity

        @OneToMany(() => PetEntity, (pet) => pet.adopter)
        pets!: PetEntity[]

    constructor(
        name: string,
        password: string,
        phone: string,
        img_profile?: string,
        address?: AddressEntity
    ) {
        this.name = name
        this.password = password
        this.phone = phone
        this.img_profile = img_profile
        this.address = address
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(password: string) {
        this.password = createHashPassword(this.password)
    }
}