"use strict";

const router = require("express").Router();

const token = require("../controllers/token");

const { isLogin } = require("../middlewares/permissions");

router.route("/").get(isLogin, token.list).post(isLogin, token.create);

router
  .route("/:id")
  .get(isLogin, token.read)
  .put(isLogin, token.update)
  .patch(isLogin, token.update)
  .delete(isLogin, token.delete);

module.exports = router;
