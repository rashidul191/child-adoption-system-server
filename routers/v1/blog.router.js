const express = require("express");

const blogController = require("../../controllers/blog.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router
  .route("/:id")
  .get(blogController.getBlogById)
  .delete(verifyJWT, authorization, blogController.deleteBlogById);
  // .post(blogController.postBlogWithId)

router
  .route("/")
  .get(blogController.getBlog)
  .post(verifyJWT, authorization, blogController.postBlog);


module.exports = router;
