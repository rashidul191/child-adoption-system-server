const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const {
  putSubscriptionService,
  getSubscriptionService,
} = require("../services/subscription.service");

module.exports.putSubscription = async (req, res, next) => {
  try {
    const putSubscription = await putSubscriptionService(req);

    if (!putSubscription.acknowledged) {
      resStatusErrorIf(res, "put subscription");
    }
    resStatusSuccess(res, "put subscription", putSubscription);
  } catch (error) {
    resStatusError(res, "put subscription", error);
  }
};

module.exports.getSubscription = async (req, res, next) => {
  try {
    const getSubscription = await getSubscriptionService();
    if (!getSubscription) {
      resStatusErrorIf(res, "put subscription");
    }
    resStatusSuccess(res, "put subscription", getSubscription);
  } catch (error) {
    resStatusError(res, "get subscription", error);
  }
};
