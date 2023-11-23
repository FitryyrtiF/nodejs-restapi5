import express from "express";
import "dotenv/config";
import { route } from "./routes/index.js";
import { dbInit } from "./database/index.js";

const app = express();
const PORT = process.env.SERVER_PORT;

dbInit();

//json and urlencoded act as body parser to get data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(route);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
