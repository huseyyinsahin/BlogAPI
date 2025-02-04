"use strict";

const { mongoose } = require("../config/dbConnection");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      trim: true,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "comments", timesmap: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
