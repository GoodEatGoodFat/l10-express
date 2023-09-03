//functions, which do the work load.
//they are only functions, do not do any routing
//use module.export to export the functions

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
let id = 6;

const taskGet =
  ("",
  (req, res) => {
    var queryLength = Object.keys(req.query).length;
    if (queryLength) {
      const queryTask = tasks.filter((task) =>
        task.description.includes(req.query.description)
      );
      res.send(queryTask);
      return;
    } else res.send(tasks);
  });

const taskGetById =
  ("/:id",
  (req, res) => {
    //get :id
    const inputId = req.params.id;
    const inputIdInt = parseInt(inputId);
    if (inputId === undefined || isNaN(inputIdInt)) {
      return res.send("please input a valid task id");
    }

    const taskById = tasks.find((task) => task.id === inputIdInt);
    // console.log(taskById);
    //return a array

    // fail fast
    if (!taskById) {
      res.status(404).json({
        msg: `Sorry, there is no task for id:${id}`,
      });
      return;
    }
    res.send(taskById);
  });

const taskPut =
  ("/:id",
  (req, res) => {
    //1.find id
    const inputId = req.params.id;
    const inputIdInt = parseInt(inputId);
    if (inputId === undefined || isNaN(inputIdInt)) {
      return res.send("please input a valid task id");
    }

    // find index
    const taskById = tasks.findIndex((task) => task.id === inputIdInt);
    if (taskById === -1) {
      res.send("no ID found");
      return;
    }

    // put description
    // const newDescription = req.body.description;
    const { description, done } = req.body;
    // tasks[taskById].id = inputId; //no need to update the id.
    if (description !== undefined) {
      tasks[taskById].description = description;
    }
    if (done !== undefined) {
      tasks[taskById].done = done;
    }

    console.log(tasks[taskById]);
    res.send(tasks[taskById]);
  });

const taskPost =
  ("/",
  (req, res) => {
    //1.require
    const { description } = req.body;

    if (description !== undefined) {
      tasks.push({});
      tasks.at(-1).id = ++id;
      tasks.at(-1).description = req.body.description;
      //default task done to false
      tasks.at(-1).done = false;
      res.send(tasks.at(-1));
    } else {
      //if conflict, return empty.
      res.send([]);
    }
  });

const taskDeleteById =
  ("/:id",
  (req, res) => {
    const delID = parseInt(req.params.id);
    const delIndex = tasks.findIndex((task) => task.id === delID);
    if (delID === NaN || delIndex === -1) {
      res.send([]);
    } else {
      res.send(tasks.splice(delIndex, 1));
    }
  });

module.exports = { taskGet, taskGetById, taskPut, taskPost, taskDeleteById };
