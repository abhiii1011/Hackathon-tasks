import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  image: String,
  price: { type: Number, required: true }, // in INR or USD (major units)
  currency: { type: String, default: "usd" }
});

export default mongoose.model("Product", ProductSchema);
