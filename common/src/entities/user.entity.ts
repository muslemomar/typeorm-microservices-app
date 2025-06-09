import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from 'typeorm';
import { toHash } from '../utils/bcrypt';
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
        this.password = await toHash(this.password);
    }

    toJSON() {
        const { password, ...user } = this;
        return user;
    }
}
