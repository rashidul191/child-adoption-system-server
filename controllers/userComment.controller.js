const {
  resStatusError,
  resStatusErrorIf,
  resStatusSuccess,
} = require("../middleware/ResStatus");
const {
  postUserCommentService,
  getUserCommentService,
} = require("../services/userComment.service");

module.exports.postUserComment = async (req, res, next) => {
  try {
    const postUserComment = await postUserCommentService(req);
    if (!postUserComment.insertedId) {
      resStatusErrorIf(res, "post user comment");
    }
    resStatusSuccess(res, "post user comment", postUserComment);
  } catch (error) {
    resStatusError(res, "post user comment", error);
  }
};

module.exports.getUserComment = async (req, res, next) => {
  try {
    const getUserComment = await getUserCommentService(req);
    if (!getUserComment) {
      resStatusErrorIf(res, "get user comment");
    }
    resStatusSuccess(res, "get user comment", getUserComment);
  } catch (error) {
    resStatusError(res, "get user comment", error);
  }
};
