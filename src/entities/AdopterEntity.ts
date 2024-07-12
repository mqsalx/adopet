import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import AddressEntity from "./AddressEntity.js";

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
}