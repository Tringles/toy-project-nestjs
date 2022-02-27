import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kakaoId: number;

    @Column()
    nickname: string;

    @Column()
    profileImage: string;

    @Column()
    email: string;
}