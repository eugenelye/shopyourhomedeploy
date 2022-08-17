const mongoose = require("mongoose");

const FurnitureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    category: { type: String },
  },
  { collection: "furniture" }
);

const Furniture = mongoose.model("Furniture", FurnitureSchema);

module.exports = Furniture;
