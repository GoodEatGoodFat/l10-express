const express = require("express");

const apiCall = express.Router();
const tasks = [
  {
    id: 1,
    description: "task 1",
    done: true,
  },
  {
    id: 2,
    description: "task 2",
    done: false,
  },
  {
    id: 3,
    description: "task 3",
    done: false,
  },
  {
    id: 4,
    description: "task 4",
    done: true,
  },
  {
    id: 5,
    description: "task 5",
    done: false,
  },
  {
    id: 6,
    description: "task 6",
    done: false,
  },
];

//id: /:id --
//

const filterTasks = () => {};

apiCall.get("", (req, res) => {
  var queryLength = Object.keys(req.query).length;
  if (queryLength) {
    //输入的query是string，tasks中的done是boolean
    //都会被转换成number。 sting是NaN，true是1.
    const doneValue = req.query.done === "true";
    res.status(200).send(tasks.filter((task) => task.done === doneValue));
  } else {
    res.status(200).send(tasks);
  }
});

apiCall.get("/:id", (req, res) => {
  const taskById = tasks.filter((task) => task.id === parseInt(req.params.id));
  if (taskById.length) {
    res.status(200).send(taskById);
  } else {
    res.status(400).send(`there is no task with ID ${req.params.id}`);
  }
});

apiCall.put("/:id", (req, res) => {
  //1.find id
  const idValue = parseInt(req.params.id);
  const newDescription = req.body.description;
  const newDone = req.body.done === "true";

  const taskById = tasks.findIndex((task) => task.id === idValue);
  //2.update
  //if no ID, return error.
  //task[] = newvalue
  //reutrn a success text
  if (taskById === -1) {
    res.status(400).send(`there is no ID ${idValue}`);
  } else {
    // tasks[taskById].id = idValue; //no need to update the id.
    tasks[taskById].description = newDescription;
    tasks[taskById].done = newDone;
    // if we need a function to update the done status of the task:
    //tasks[].done = !newDone
  }

  res.status(200).send(tasks[taskById]);
});

//
apiCall.post("/", (req, res) => {
  /**
   * if no id, push to end, give a increment id.
   * This function depends on the structure and the need.
   * if user can setup their own id by themself, the primary key should be untouchable by users.
   * then the tasks[].id should be only be used for mark or secondary key.
   * if (req.body.id === undefined) {
   * tasks.push({});
   * tasks[tasks.length - 1].id = tasks.length;
   * tasks[tasks.length - 1].description = req.body.description;
   * tasks[tasks.length - 1].done = req.body.done;
   * res.send({ msg: `updated, id is ${tasks[tasks.length - 1].id}` });
   * } else
   *
   */

  //if id is not conflict, add the body to the end.
  if (tasks.findIndex((task) => task.id === req.body.id) === -1) {
    tasks.push(req.body);
    res.status(201).send({ msg: "updated" });
  } else {
    //if conflict, return msg.
    res.status(400).send({ msg: "the selected id is occupied" });
  }
});

apiCall.delete("/:id", (req, res) => {
  const delID = tasks.findIndex((task) => {
    task.id === id;
  });
  if (delID === -1) {
    res.status(202).send({ msg: "no ID found" });
  } else {
    tasks.splice(req.params.id, 1);
    res.status(204).send({ msg: "the task is deleted" });
  }
});

module.exports = apiCall;
