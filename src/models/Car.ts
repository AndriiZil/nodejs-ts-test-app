import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User}  from './User';
import { Driver } from './Driver';

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Driver, driver => driver.car, { onDelete: 'CASCADE' })
    drivers: Driver[];

    @ManyToOne(() => User, user => user.cars, { onDelete: 'CASCADE' })
    user: User | number;

}
