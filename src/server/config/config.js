import dotenv from 'dotenv';
import fs from 'fs';
import mariadb from 'mariadb';

dotenv.config({ path: '../../../.env' });

const JWT_SECRET = process.env.JWT_SECRET;

const pool = mariadb.createPool(
    {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
})

const options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
};

export { pool, options, JWT_SECRET };