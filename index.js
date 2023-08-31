const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// require export function module for api
const apiCall = require("./call_api.js");
app.use("/tasks", apiCall);

app.listen(PORT);
