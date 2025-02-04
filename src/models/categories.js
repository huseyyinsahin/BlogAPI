"use strict";

const { mongoose } = require("../config/dbConnection");

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "categories", timesmap: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
