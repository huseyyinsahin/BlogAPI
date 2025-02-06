"use strict";

const router = require("express").Router();
const category = require("../controllers/category");
const { isLogin } = require("../middlewares/permissions");

router.route("/").get(category.list).post(isLogin,category.create);

router
  .route("/:id")
  .get(category.read)
  // .put( category.update)
  // .patch( category.update)
  // .delete( category.delete);

module.exports = router;
