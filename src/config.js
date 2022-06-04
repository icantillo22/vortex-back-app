import { config } from "dotenv";
config();

export default {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'postgres',
    DB_PORT: process.env.DB_PORT || '5432',
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET || 'MyScr3tK3y',
};