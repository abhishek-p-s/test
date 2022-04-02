import express from "express";
import expressAsyncHandler from "express-async-handler";
import Item from "../model/data.js";
import bodyParser from "body-parser";
import data from "../../data.js";
import { isAuth } from "../utils.js";

const indexRoute = express.Router();
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

indexRoute.get(
  "/list",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.isAdmin === true) {
      var product = await Item.find({});
    } else {
      var product = await Item.find({ user: req.user._id });
    }
    console.log("user data", product);
    console.log("user id", req.user._id);
    res.send(product);
  })
);

indexRoute.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProduct = await Item.insertMany(data.products);
    res.send({ createdProduct });
  })
);

indexRoute.get(
  "/list/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Item.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
    // console.log("inside api ");
  })
);

indexRoute.put(
  "/list/update/:id",
  jsonParser,
  expressAsyncHandler(async (req, res) => {
    const product = await Item.findById(req.params.id);
    if (product) {
      console.log(req.body);
      (product.name = req.body.name), (product.hour = req.body.hour);
      const itemUpdate = await product.save();
      res.send({ message: "Item Updated", item: itemUpdate });
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
    //console.log("inside api ");
  })
);

indexRoute.post(
  "/list/add",
  jsonParser,
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newData = new Item({
      name: req.body.name,
      hour: req.body.hour,
      date: req.body.date,
      projectName: req.body.projectName,
      user: req.user._id,
    });
    const itemData = await newData.save();

    res.send({ itemData });

    //console.log("inside api ");
  })
);

indexRoute.delete(
  "/list/delete/:id",
  expressAsyncHandler(async (req, res) => {
    const newData = await Item.findById(req.params.id);
    const product = await Item.deleteOne({ _id: req.params.id });

    if (product) {
      res.status(200).send({ newData });
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
    // console.log("inside api ");
  })
);

export default indexRoute;
