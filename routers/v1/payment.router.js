const express = require("express");
const paymentController = require("../../controllers/payment.controller");
const authorization = require("../../middleware/authorization");

const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/create-payment-intent", paymentController.cardOfPayment);
router
  .route("/")
  .get(verifyJWT, authorization, paymentController.getPayment)
  .post(paymentController.postPayment);

module.exports = router;
