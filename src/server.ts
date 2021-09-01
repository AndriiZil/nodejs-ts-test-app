import express from 'express';
import http from 'http';
import logger from 'morgan';
import { Routes } from './routes';
import { establishConnection } from './connection';
import { error404, errorHandeling } from './utils';

class Server {

    constructor(
        public server: http.Server | null = null,
        private app: express.Express | null = null
    ) {}

    async start() {
        this.initApp();
        this.initMiddlewares();
        this.initRoutes();
        await this.createDbConnection()
        this.errorHandeling();
        this.unhandledRejectionError();
        this.listen();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(logger('dev'));
    }

    initRoutes() {
        Routes(this.app);
    }

    initApp() {
        this.app = express();
    }

    async createDbConnection() {
        await establishConnection();
    }

    errorHandeling() {
        this.app.use(errorHandeling);
        this.app.use(error404);
    }

    listen() {
        this.app?.listen(process.env.PORT || 3000, () => {
            console.log('Server started on port: 3000');
        })
    }

    unhandledRejectionError() {
        process.on('unhandledRejection', (error) => {
            console.error(error);
            this.server?.close(() => process.exit(1));
        });
    }

}

export default Server;
