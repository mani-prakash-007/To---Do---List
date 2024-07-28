const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoModel = require("./Models/ToDo");
require("dotenv").config();
const uri = process.env.CONN_URI;

const app = express();
app.use(cors());
app.use(express.json());

//Local Db Connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.post("/add", (req, res) => {
  const task = req.body.task;
  ToDoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

//Server
app.listen(3000, () => {
  console.log("Server is running on Port : 3000");
});
