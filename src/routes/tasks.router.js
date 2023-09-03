const express = require("express");
const taskRouter = express.Router();
const {
  taskGet,
  taskGetById,
  taskPut,
  taskPost,
  taskDeleteById,
} = require("../controllers/tasks.controller");
console.log(123)
taskRouter.get("/", taskGet);
taskRouter.get("/:id", taskGetById);
taskRouter.put("/:id", taskPut);
taskRouter.post("/", taskPost);
taskRouter.delete("/:id", taskDeleteById);

module.exports = taskRouter
