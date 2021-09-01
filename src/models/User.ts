import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from './Car';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Car, car => car.user, { onDelete: 'CASCADE' })
    cars: Car[];

}
