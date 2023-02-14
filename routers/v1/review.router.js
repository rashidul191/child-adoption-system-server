const express = require("express");
const reviewController = require("../../controllers/review.controller");
const { verifyJWT } = require("../../middleware/verifyToken");
const router = express.Router();

router.get("/", reviewController.getReview);
router.put("/:email", verifyJWT, reviewController.putReview);

module.exports = router;
