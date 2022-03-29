import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, {
    timestamps: true,
});

const Item = mongoose.model("Item", DataSchema);

export default Item;