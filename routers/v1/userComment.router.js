const express = require("express");
const userCommentController = require("../../controllers/userComment.controller");

const router = express.Router();

router.route("/:id").delete(userCommentController.deleteComment)

router
  .route("/")
  .get(userCommentController.getUserComment)
  .post(userCommentController.postUserComment);

module.exports = router;
