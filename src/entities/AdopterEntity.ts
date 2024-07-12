import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

    @Entity()
    export default class AdopterEntity {
        @PrimaryGeneratedColumn()
            id!: number;
            @Column()
            name: string;
            @Column()
            password: string;
            @Column()
            phone: string;
            @Column({ nullable: true })
            img_profile?: string;
            @Column({ nullable: true })
            address?: string;

        constructor(
            name: string,
            password: string,
            phone: string,
            img_profile?: string,
            address?: string
        ) {
            this.name = name;
            this.password = password;
            this.phone = phone;
            this.img_profile = img_profile;
            this.address = address;
        }
    }