"use strict";

const { mongoose } = require("../configs/dbConnection");

const blogSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 55,
    },

    content: {
      type: String,
      trim: true,
      required: true,
      minlength: 300,
      maxlength: 5000,
    },

    image: {
      type: String,
      trim: true,
      required: true,
    },

    isPublish: {
      type: Boolean,
      default: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    visitors: [],

    countOfVisitors: {
      type: Number,
      get: function () {
        return this.visitors.length;
      },
    },
  },
  {
    collection: "blogs",
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
