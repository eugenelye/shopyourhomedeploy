require('dotenv').config({path:"./.env"})
const path = require('path');
const express = require("express");
const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
const users = require("./router/users");
const Furniture = require("./models/Furniture");



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
