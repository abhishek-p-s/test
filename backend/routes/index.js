import express from "express";
import expressAsyncHandler from "express-async-handler";
import Item from "../model/data.js";
import bodyParser from "body-parser";
import data from "../../data.js";

const indexRoute = express.Router();
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

indexRoute.get(
    "/list",
    expressAsyncHandler(async(req, res) => {
        const product = await Item.find({});
        res.send(product);
    })
);

indexRoute.get(
    "/seed",
    expressAsyncHandler(async(req, res) => {
        const createdProduct = await Item.insertMany(data.products);
        res.send({ createdProduct });
    })
);

indexRoute.get(
    "/list/:id",
    expressAsyncHandler(async(req, res) => {
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
    expressAsyncHandler(async(req, res) => {
        const product = await Item.findById(req.params.id);
        if (product) {
            console.log(req.body);
            (product.name = req.body.name), (product.email = req.body.email);
            const itemUpdate = await product.save();
            res.send({ message: "Item Updated", item: itemUpdate });
        } else {
            res.status(404).send({ message: "Item Not Found" });
        }
        //console.log("inside api ");
    })
);

export default indexRoute;