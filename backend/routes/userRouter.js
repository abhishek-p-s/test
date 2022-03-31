import express from "express";
import expressAsyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"

const userRouter = express.Router();

var jsonParser = bodyParser.json();

userRouter.post(
    "/signin",
    expressAsyncHandler(async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    //token: generateToken(user),
                });
            } else {
                res.status(401).send({ message: "incorrect password" });
            }
        } else {
            res.status(401).send({ message: "No user found" });
        }
    })
);

export default userRouter;