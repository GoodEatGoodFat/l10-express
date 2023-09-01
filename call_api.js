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

//if add an input validation check
// function inputValidation(inputString) {}

//get all, get by  query ?description=xxx
apiCall.get("", (req, res) => {
  var queryLength = Object.keys(req.query).length;
  if (queryLength) {
    const queryTask = tasks.filter((task) =>
      task.description.includes(req.query.description)
    );
    res.send(queryTask);
    return;
  } else res.send(tasks);
});

apiCall.get("/:id", (req, res) => {
  //get :id
  const inputId = req.params.id;
  const inputIdInt = parseInt(inputId);
  if (inputId === undefined || isNaN(inputIdInt)) {
    return res.send("please input a valid task id");
  }

  const taskById = tasks.filter((task) => task.id === inputIdInt);
  // console.log(taskById);
  //return a array
  res.send(taskById[0]);
});

apiCall.put("/:id", (req, res) => {
  //1.find id
  const inputId = req.params.id;
  const inputIdInt = parseInt(inputId);
  if (inputId === undefined || isNaN(inputIdInt)) {
    return res.send("please input a valid task id");
  }

  // put description
  const newDescription = req.body.description;

  const taskById = tasks.findIndex((task) => task.id === inputIdInt);

  if (taskById === -1) {
    res.send("no ID found");
  } else {
    // tasks[taskById].id = inputId; //no need to update the id.
    tasks[taskById].description = newDescription;
    tasks[taskById].done = !tasks[taskById].done;
  }
  console.log(tasks[taskById]);
  res.send(tasks[taskById]);
});

//
const idCount = (function () {
  let counter = tasks.length;
  return function () {
    return ++counter;
  };
})();

apiCall.post("/", (req, res) => {
  if (req.body.description !== undefined) {
    tasks.push({});
    tasks.at(-1).id = idCount();
    tasks.at(-1).description = req.body.description;
    //default task done to false
    tasks.at(-1).done = false;
    res.send(tasks.at(-1));
  } else {
    //if conflict, return empty.
    res.send([]);
  }
});

apiCall.delete("/:id", (req, res) => {
  const delID = parseInt(req.params.id);
  const delIndex = tasks.findIndex((task) => task.id === delID);
  if (delID === NaN || delIndex === -1) {
    res.send([]);
  } else {
    res.send(tasks.splice(delIndex, 1));
  }
});

module.exports = apiCall;
