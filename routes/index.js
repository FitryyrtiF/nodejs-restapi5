import { Router } from "express";
import { get, post } from "../controllers/publicCtrl.js";
import { login, register } from "../controllers/authCtrl.js";

export const route = Router();

route.get("/", get);
route.post("/", post);
route.post("/register", register);
route.post("/login", login);
