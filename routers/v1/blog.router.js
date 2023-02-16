const express = require("express");

const blogController = require("../../controllers/blog.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router
  .route("/")
  .get(blogController.getBlog)
  .post(verifyJWT, authorization, blogController.postBlog);
  //.post(blogController.postBlog);
router
  .route("/:id")
  .get(blogController.getBlogById)
  .delete(verifyJWT, authorization, blogController.deleteBlogById);

module.exports = router;
