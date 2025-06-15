import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    completed: boolean;

    @Column()
    userId: number;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    toJSON() {
        const { user, ...todo } = this;
        return todo;
    }
}
