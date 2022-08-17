const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    furniture: [
      {
        name: { type: String },
        image: { type: String },
        price: { type: Number },
        description: { type: String },
        category: { type: String },
      },
    ],
    order: [
      {
        date: { type: String },
        price: { type: Number },
        furniture: [
          {
            name: { type: String },
            image: { type: String },
            price: { type: Number },
            description: { type: String },
            category: { type: String },
          },
        ],
      },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
