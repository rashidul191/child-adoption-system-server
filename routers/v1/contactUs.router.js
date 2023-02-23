const express = require("express");
const contactUsController = require("../../controllers/contactUs.controller");

const router = express.Router();
router.post("/", contactUsController.postContactUs);

module.exports = router;
