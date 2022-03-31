import express from "express";
import mongoose from "mongoose";
import data from "../data.js";
import cors from "cors";

import indexRoute from "./routes/index.js";
import userRoute from "./routes/userRouter.js";

const app = express();
app.use(cors());

mongoose
    .connect("mongodb://localhost/tableTest", {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// mongoose
//   .connect(
//     "mongodb+srv://abhishek:lDoS5BaMxCGDhR0A@cluster0.tnyk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/tableTest",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("server is started...");
});

app.use("/api", indexRoute);

app.use("/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});