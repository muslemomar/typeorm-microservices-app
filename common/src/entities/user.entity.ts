import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from 'typeorm';
import { Password } from '../services/password';
import {Todo} from "./todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await Password.toHash(this.password);
    }

    toJSON() {
        const { password, ...user } = this;
        return user;
    }
}
