"use strict";

const User = require("../models/user");
const Blog = require("../models/blog");

const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

    const user = await User.create(req.body);
    const data = await User.findOne({ _id: user._id }).select({ password: 0 });

    const tokenData = await Token.create({
      userId: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });

    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Get Single User"
    */

    let data = await User.findOne({ _id: req.user._id }).select({
      password: 0,
    });

    if (!data) {
      throw new Error("User not found");
    }

    const blogs = await Blog.find({ userId: req.user._id }).limit(4);

    res.status(200).send({
      error: false,
      data: { ...data.toObject(), blogs },
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

    const data = await User.updateOne({ _id: req.user._id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne(req.user._id),
    });
  },
};
