"use strict";

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    contact: { name: packageJson.author, email: "github:huseyyinsahin" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Simple Token Authentication * Example: <b>Token ...tokenKey...</b>",
    },
  },
  security: [{ Token: [] }],
  definitions: {
    User: require("./src/models/user").schema.obj,
    Blog: require("./src/models/blog").schema.obj,
    Category: require("./src/models/category").schema.obj,
    Comment: require("./src/models/comment").schema.obj,
  },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

swaggerAutogen(outputFile, routes, document);
