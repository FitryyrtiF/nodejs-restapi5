import { Sequelize } from "sequelize";
import "dotenv/config";

export const dbConnection = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});
