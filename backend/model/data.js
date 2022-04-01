import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hour: { type: String, required: true },
    date: { type: String, required: true },
    projectName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", DataSchema);

export default Item;
