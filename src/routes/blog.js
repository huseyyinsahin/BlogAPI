"use strict";

const router = require("express").Router();

const blog = require("../controllers/blog");
const { isLogin } = require("../middlewares/permissions");

router.route("/").get(blog.list).post(isLogin, blog.create);

router
  .route("/:id")
  .get(blog.read)
  .put(isLogin, blog.update)
  .patch(isLogin, blog.update)
  .delete(isLogin, blog.delete);

router.route("/:id/postLike").post(isLogin, blog.postLike);
router.route("/:id/getLike").get(isLogin, blog.getLike);

module.exports = router;
