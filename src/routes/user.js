"use strict";

const router = require("express").Router();

const user = require("../controllers/user");
const { isLogin } = require("../middlewares/permissions");

router.route("/").post(user.create);

router
  .route("/:id")
  .put(isLogin, user.update)
  .patch(isLogin, user.update);

module.exports = router;
