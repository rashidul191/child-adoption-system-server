const { resStatusError, resStatusSuccess } = require("../middleware/ResStatus");
const {
  getPaymentService,
  postPaymentService,
  cardOfPaymentService,
} = require("../services/payment.service");

module.exports.getPayment = async (req, res, next) => {
  try {

    const getPayment = await getPaymentService();
    if (!getPayment) {
      resStatusError(res, "get payment", error);
    }
    resStatusSuccess(res, "get payment", getPayment);
  } catch (error) {
    resStatusError(res, "get payment", error);
  }
};

module.exports.postPayment = async (req, res, next) => {
  try {
    const postPayment = await postPaymentService(req);
    if (!postPayment.insertedId) {
      resStatusError(res, "post payment");
    }
    resStatusSuccess(res, "post payment", postPayment);
  } catch (error) {
    resStatusError(res, "post payment", error);
  }
};

module.exports.cardOfPayment = async (req, res, next) => {
  try {
    const cardOfPayment = await cardOfPaymentService(req);
    resStatusSuccess(res, "post card of payment", cardOfPayment);
  } catch (error) {
    resStatusError(res, "post card of payment", error);
  }
};
