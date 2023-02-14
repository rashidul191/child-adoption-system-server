const { resStatusError, resStatusSuccess } = require("../middleware/ResStatus");
const {
  getReviewService,
  putReviewService,
} = require("../services/review.service");

module.exports.getReview = async (req, res, next) => {
  try {
    const getReview = await getReviewService();
    if (!getReview) {
      resStatusError(res, "get review", error);
    }
    resStatusSuccess(res, "get review", getReview);
  } catch (error) {
    resStatusError(res, "get review", error);
  }
};

module.exports.putReview = async (req, res, next) => {
  try {
    const putReview = await putReviewService(req);
    if (!putReview.acknowledged) {
      resStatusError(res, "create / update review");
    }
    resStatusSuccess(res, "create / update review", putReview);
  } catch (error) {
    resStatusError(res, "create / update review", error);
  }
};
