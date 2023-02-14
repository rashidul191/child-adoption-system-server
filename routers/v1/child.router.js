const express = require("express");
const childController = require("../../controllers/child.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");
const router = express.Router();

router.get("/childLength", childController.childLength);
router
  .route("/")
  .get(verifyJWT, authorization, childController.getChild)
  .post(verifyJWT, authorization, childController.postChild);
router
  .route("/:id")
  .get(childController.getChildById)
  .delete(verifyJWT, authorization, childController.deleteChildById);

router.get("/childType/:childType", childController.childTypes);

module.exports = router;
