"use strict";

const Blog = require("../models/blog");
const requestIp = require("request-ip");

const encrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    if (req.query.author) {
      const data = await Blog.find({ userId: req.query.author }).populate([
        { path: "userId", select: "firstName lastName image" },
      ]);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Blog, {
          userId: req.query.author,
        }),
        data,
      });
    } else {
      const data = await res.getModelList(Blog, { isPublish: true }, [
        "categoryId",
        {
          path: "userId",
          select: "firstName lastName image",
        },
        {
          path: "comments",
          populate: {
            path: "userId",
            select: "firstName lastName image",
          },
        },
      ]);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Blog, { isPublish: true }),
        data,
      });
    }
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
        }
    */
    const userId = req.user._id;
    req.body.userId = userId;
    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
    const ip = encrypt(requestIp.getClientIp(req));

    const data = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { visitors: ip } },
      { new: true }
    )
      .populate({
        path: "comments",
        select: "_id comment blogId updatedAt",
        populate: {
          path: "userId",
          select: "username firstName lastName image",
        },
      })
      .populate({
        path: "userId",
        select: "username firstName lastName image",
      });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
            }
        */
    const data = await Blog.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */
    const data = await Blog.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  postLike: async (req, res, next) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Add/Remove Like"
        */
    const blog = await Blog.findById(req.params.id).catch(next);

    if (!blog) {
      return res.status(404).send({
        error: true,
        message: "Blog not found",
      });
    }

    const userId = req.user._id;
    const userLike = blog.likes.includes(userId);

    const update = userLike
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
    })
      .select("likes")
      .catch(next);

    res.status(200).send({
      error: false,
      userLike: !userLike,
      countOfLikes: updatedBlog.likes.length,
      likes: updatedBlog.likes,
    });
  },
};
