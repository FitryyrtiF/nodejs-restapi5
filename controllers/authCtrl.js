import { Op } from "sequelize";
import { userOne } from "../models/userOne.js";
import bcrypt from "bcryptjs";
import _ from "lodash";

export const register = async (req, res) => {
  try {
    //registered user info
    const regBody = {
      email: req.body.email,
      username: req.body.username,
    };

    //db check if user already exists
    const existingUser = await userOne.findOne({
      where: {
        [Op.or]: [{ email: regBody.email }, { username: regBody.username }],
      },
    });
    if (existingUser) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    //hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //sequelize - register user into db
    await userOne.create({
      username: regBody.username,
      email: regBody.email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "REGISTRATION SUCCESSFUL",
      regUser: { email: regBody.email, username: regBody.username },
    });
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};

export const login = async (req, res) => {
  try {
    //user log info
    const logBody = {
      email: req.body.email,
      username: req.body.username,
    };

    //sequelize - find email in db
    const findDb = await userOne.findOne({ where: { email: logBody.email } });
    //create object for database user info
    const logDb = {
      email: findDb.dataValues.email,
      username: findDb.dataValues.username,
    };

    //compare password
    const checkPasswordTrue = bcrypt.compareSync(
      req.body.password,
      findDb.dataValues.password
    );

    //compare log data and db data
    if (_.isEqual(logBody, logDb) && checkPasswordTrue) {
      return res.status(200).json({
        message: "USER LOGGED-IN",
        logUser: { email: logBody.email, username: logBody.username },
      });
    } else {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};
