"use strict";

const express = require("express");
const app = express();

const { dbConnection, mongoose } = require("./src/config/dbConnection");

/* ------------------------------------------------------- */
require("express-async-errors");

require("dotenv").config();
const PORT = process.env?.PORT || 8000;
/* ------------------------------------------------------- */

dbConnection();

app.use(express.json());

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/authentication"));
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */

app.use(require("./src/routes/index"));

app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});

app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT);
