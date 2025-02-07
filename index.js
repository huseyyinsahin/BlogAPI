"use strict";

const express = require("express");
const app = express();
const { dbConnection } = require("./src/configs/dbConnection");
const cors = require("cors");

/* ------------------------------------------------------- */

require("dotenv").config();
require("express-async-errors");

const PORT = process.env?.PORT || 8000;

/* ------------------------------------------------------- */

dbConnection();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(require("./src/middlewares/authentication"));
app.use(require("./src/middlewares/query"));

/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Infinite BLOG",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
  });
});

app.use(require("./src/routes/index"));

app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log(`${PORT}`));

require("./src/helpers/sync")();
