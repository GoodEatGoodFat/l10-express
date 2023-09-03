const taskRouter = require("./tasks.router");
const express = require("express"),
  router = express.Router();

router.use("/tasks", taskRouter);

module.exports = router;
