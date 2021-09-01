import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './Car';

@Entity()
export class Driver {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: number;

    @ManyToOne(() => Car, car => car.drivers, { onDelete: 'CASCADE' })
    car: Car;

}
