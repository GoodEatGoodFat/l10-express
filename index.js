const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(cors());

// 处理预检请求

app.use(express.json());

// require export function module for api
const apiCall = require("./call_api.js");

app.use("/tasks", apiCall);

app.listen(PORT);
