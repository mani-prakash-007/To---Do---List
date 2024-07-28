const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const ToDoModel = mongoose.model("todos", ToDoSchema);
module.exports = ToDoModel;
