const express = require("express");
const userCommentController = require("../../controllers/userComment.controller");
const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router.route("/:id").delete(verifyJWT, userCommentController.deleteComment);

router
  .route("/")
  .get(userCommentController.getUserComment)
  .post(userCommentController.postUserComment);

module.exports = router;
