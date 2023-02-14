const express = require("express");
const agencyController = require("../../controllers/agency.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .get(agencyController.getAgency)
  .post(verifyJWT, authorization, agencyController.postAgency);

router
  .route("/:id")
  .get(agencyController.getAgencyById)
  .delete(verifyJWT, authorization, agencyController.deleteAgencyById);

module.exports = router;
