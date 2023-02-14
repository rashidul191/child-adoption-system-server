const express = require("express");
const childApplyController = require("../../controllers/childApply.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");
const router = express.Router();

router.get(
  "/child-apply",
  verifyJWT,
  childApplyController.getChildApplyWithEmail
);
router
  .route("/")
  .get(verifyJWT, authorization, childApplyController.getChildApply)
  .post(verifyJWT, childApplyController.postChildApply);
router
  .route("/:id")
  .get(verifyJWT, authorization, childApplyController.getChildApplyById)
  .put(verifyJWT, authorization, childApplyController.putChildApplyById)
  .delete(verifyJWT, authorization, childApplyController.deleteChildApplyById);

module.exports = router;
