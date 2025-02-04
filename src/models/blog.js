"use strict";

const { mongoose } = require("../config/dbConnection");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    isPublish: {
      type: Boolean,
      trim: true,
      required: true,
    },
    likes: {
      type: String,
      trim: true,
    },
    countOfVisitors: {
      type: Number,
      trim: true,
    },
  },
  { collection: "blogs", timesmap: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
