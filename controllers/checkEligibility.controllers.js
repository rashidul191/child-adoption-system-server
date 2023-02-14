const {
  resStatusSuccess,
  resStatusError,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const {
  getCheckEligibilityForUserService,
  putCheckEligibilityService,
} = require("../services/checkEligibility.service");

// get check eligibility
module.exports.getCheckEligibilityForUser = async (req, res, next) => {
  try {
    const getCheckEligibilityForUser = await getCheckEligibilityForUserService(
      req
    );

    if (!getCheckEligibilityForUser) {
      resStatusErrorIf(res, "get check eligibility");
    }
    resStatusSuccess(res, "get check eligibility", getCheckEligibilityForUser);
  } catch (error) {
    next(error);
    resStatusError(res, "get check eligibility", error);
  }
};

// update check eligibility
module.exports.putCheckEligibility = async (req, res, next) => {
  try {
    const putCheckEligibility = await putCheckEligibilityService(req);
    if (!putCheckEligibility.acknowledged) {
      resStatusErrorIf(res, "put check eligibility");
    }
    resStatusSuccess(res, "put check eligibility", putCheckEligibility);
  } catch (error) {
    next(error);
    resStatusError(res, "put check eligibility", error);
  }
};
