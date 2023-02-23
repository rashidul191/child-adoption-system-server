const express = require("express");
const userController = require("../../controllers/user.controller");
const authorization = require("../../middleware/authorization");
const { verifyJWT } = require("../../middleware/verifyToken");

const router = express.Router();

router
  .route("/:email")
  .put(userController.putUser)
  .delete(verifyJWT, authorization, userController.deleteUser);

router.route("/").get(verifyJWT, authorization, userController.getUser);
router.route("/allUser").get(userController.getAllUser);

router
  .route("/userRole")
  .get(verifyJWT, authorization, userController.getUserRole);
router.route("/email").get(userController.getUserWithEmail);

router
  .route("/admin/:email")
  .get(userController.getCheckAdmin)
  .put(verifyJWT, authorization, userController.putMakeAdmin);
router
  .route("/employer/:email")
  .get(userController.getCheckEmployer)
  // .put(userController.putMakeEmployer);
  .put(verifyJWT, authorization, userController.putMakeEmployer);

router.get("/allUsersLength", userController.getUserLength);

module.exports = router;
