const dotenv = require("dotenv");
dotenv.config();
const path = require('path')
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const users = require("./router/users");


const app = express();
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  };



const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

