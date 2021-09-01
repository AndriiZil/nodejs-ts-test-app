import { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
    code?: number;
    message: string;
}

export const error404 = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ message: 'Not Found' });
}

export const errorHandeling = (err: IError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const code = typeof err.code === 'string' ? 500 : err.code || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(code).json({ message });
}
