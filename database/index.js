import { userOne } from "../models/userOne.js";
import { dbConnection } from "./connection.js";

export const dbInit = async () => {
  try {
    await dbConnection.authenticate();
    console.log("DATABASE IS CONNECTED OK");
    await userOne.sync();
  } catch (error) {
    console.error("DATABASE FAILED TO CONNECT", error);
    process.exit(1);
  }
};
