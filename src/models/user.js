"use strict";

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 16,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Email type is not correct.",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Password field must be required"],
      set: (password) => {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/.test(
            password
          )
        ) {
          return passwordEncrypt(password);
        } else {
          throw new Error("Password type is not correct.");
        }
      },
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 16,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 16,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
