import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../models/User';
import {IError} from '../utils';
import {Car} from '../models/Car';

class UsersController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await getRepository(User).find({ relations: ['cars'] });

            return res.json(users);
        } catch (err) {
            next(err)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const car = new Car();
            car.name = req.body.carName;
            await getRepository(Car).save(car);

            const user = new User();
            user.name = req.body.name;
            user.cars = [car];
            await getRepository(User).save(user);

            return res.status(201).json(user);
        } catch (err) {
            next(err)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await getRepository(User).findOne({ id: req.params.id }, { relations: ['cars']});

            if (!user) {
                const error: IError = new Error('User was not found');
                error.code = 404;
                throw error;
            }

            return res.json(user);
        } catch (err) {
            next(err)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set(req.body)
                .where('id = :id', { id: req.params.id })
                .execute();

            return res.status(204).end();
        } catch (err) {
            next(err)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(User)
                .where('id = :id', { id: req.params.id })
                .execute();
            return res.status(204).end();
        } catch (err) {
            next(err)
        }
    }

}

export default UsersController;
