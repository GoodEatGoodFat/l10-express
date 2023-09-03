const express = require("express");
const cors = require("./middleware/cors");
const helmet = require("helmet");
const router = require("./routes/index");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(router);
app.use(morgan("combined"));

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
