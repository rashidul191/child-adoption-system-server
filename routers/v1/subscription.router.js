const express = require("express");
const subscriptionController = require("../../controllers/subscription.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, authorization, subscriptionController.getSubscription)
  .put(subscriptionController.putSubscription);

module.exports = router;
