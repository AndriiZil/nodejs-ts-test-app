import { Express } from 'express';
import users from './users';
import cars from './cars';

export const Routes = (app: Express | null) => {
    app?.use('/users', users);
    app?.use('/cars', cars);
}
