import { createConnection } from 'typeorm';

export async function establishConnection() {
    try {
        await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'test',
            entities : ['src/models/*.ts'],
            synchronize: true,
            logging: true,
        });

        console.warn('database connected');
    } catch (err) {
        console.error(err);
    }
}
