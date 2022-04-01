import express from "express";
import expressAsyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import { generateToken } from "../utils.js";
import data from "../../data.js";

const userRouter = express.Router();

var jsonParser = bodyParser.json();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send(createdUsers);
  })
);

userRouter.post(
  "/login",
  jsonParser,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        res.status(401).send({ message: "incorrect password" });
      }
    } else {
      res.status(401).send({ message: "No user found" });
    }
  })
);

userRouter.post(
  "/register",
  jsonParser,
  expressAsyncHandler(async (req, res) => {
    console.log("req.body", req.body);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await newUser.save();
    res.send({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
