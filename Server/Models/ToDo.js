const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const ToDoModel = mongoose.model("todos", ToDoSchema);
module.exports = ToDoModel;
