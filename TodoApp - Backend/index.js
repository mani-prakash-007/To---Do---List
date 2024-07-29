const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
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
// get all task
app.get("/get", async (req, res) => {
  await ToDoModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});
// update task
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const task = await ToDoModel.findById(id);
  if (task.done === false) {
    await ToDoModel.findByIdAndUpdate({ _id: id }, { done: true })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else if (task.done === true) {
    await ToDoModel.findByIdAndUpdate({ _id: id }, { done: false })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  }
});
//delete task
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await ToDoModel.findOneAndDelete(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
});

//add task
app.post("/add", (req, res) => {
  const task = req.body.task;
  ToDoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

//Server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
