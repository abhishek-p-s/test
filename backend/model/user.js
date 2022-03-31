import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", DataSchema);

export default User;
