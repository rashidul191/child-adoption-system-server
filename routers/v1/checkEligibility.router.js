const express = require("express");
const checkEligibilityControllers = require("../../controllers/checkEligibility.controllers");
const { verifyJWT } = require("../../middleware/verifyToken");
const router = express.Router();

router.route("/").get(checkEligibilityControllers.getCheckEligibilityForUser);
router.route("/:email").put(verifyJWT, checkEligibilityControllers.putCheckEligibility);

module.exports = router;
