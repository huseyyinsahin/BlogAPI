"use strict";

const { mongoose } = require("../config/dbConnection");

const passwordEncyrpt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "email is not valid",
      ],
    },
    image: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncyrpt(password),
    },
  },
  { collection: "users", timesmap: true }
);

module.exports = mongoose.model("User", UserSchema);
