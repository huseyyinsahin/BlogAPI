"use strict";

const router = require("express").Router();
const comment = require("../controllers/comment");
const { isLogin } = require("../middlewares/permissions");

router.route("/").post(isLogin, comment.create); //.get(isLogin, comment.list)

router
  .route("/:id")
  .get(isLogin, comment.read)
  .put(isLogin, comment.update)
  .patch(isLogin, comment.update)
  .delete(isLogin, comment.delete);

module.exports = router;
