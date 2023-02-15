require("dotenv").config();
const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const { generateToken } = require("../utils/token");
const {
  putUserService,
  getUserService,
  getAllUserService,
  getUserWithEmailService,
  getUserLengthService,
  putMakeAdminService,
  putMakeEmployerService,
  getCheckAdminService,
  getCheckEmployerService,
  deleteUserService,
} = require("../services/user.service");

module.exports.putUser = async (req, res, next) => {
  try {
    // console.log(req.params.email)
    const user = await putUserService(req);
    const token = generateToken(req.params.email); // generate jwt token here
    const userAndToken = { user, token };
    resStatusSuccess(res, "create / update user", userAndToken);
  } catch (error) {
    resStatusError(res, "create / update user", error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const getUser = await getUserService();
    if (!getUser) {
      resStatusErrorIf(res, "get user");
    }
    resStatusSuccess(res, "get user", getUser);
  } catch (error) {
    resStatusError(res, "get user", error);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await getAllUserService();
    if (!getAllUser) {
      resStatusErrorIf(res, "get all users");
    }
    resStatusSuccess(res, "get all users", getAllUser);
  } catch (error) {
    resStatusError(res, "get all users", error);
  }
};

module.exports.getUserWithEmail = async (req, res, next) => {
  try {
    const getUserWithEmail = await getUserWithEmailService(req);
    if (!getUserWithEmail) {
      resStatusErrorIf(res, "get user");
    }
    resStatusSuccess(res, "get  user", getUserWithEmail);
  } catch (error) {
    resStatusError(res, "get user", error);
  }
};

module.exports.getUserLength = async (req, res, next) => {
  try {
    const getUserLength = await getUserLengthService();
    if (!getUserLength) {
      resStatusErrorIf(res, "get user length");
    }
    resStatusSuccess(res, "get user length", getUserLength);
  } catch (error) {
    resStatusError(res, "get user length", error);
  }
};

module.exports.putMakeAdmin = async (req, res, next) => {
  try {
    const putMakeAdmin = await putMakeAdminService(req);
    if (!putMakeAdmin.modifiedCount) {
      resStatusErrorIf(res, "make admin");
    }
    resStatusSuccess(res, "make admin", putMakeAdmin);
  } catch (error) {
    resStatusError(res, "make admin", error);
  }
};

module.exports.putMakeEmployer = async (req, res, next) => {
  try {
    const putMakeEmployer = await putMakeEmployerService(req);
    if (!putMakeAdmin.modifiedCount) {
      resStatusErrorIf(res, "make employer");
    }
    resStatusSuccess(res, "make employer", putMakeEmployer);
  } catch (error) {
    resStatusError(res, "make employer", error);
  }
};

module.exports.getCheckAdmin = async (req, res, next) => {
  try {
    const getCheckAdmin = await getCheckAdminService(res, req);
    if (!getCheckAdmin) {
      resStatusErrorIf(res, "find check admin");
    }
    resStatusSuccess(res, "find check admin", getCheckAdmin);
  } catch (error) {
    resStatusError(res, "find check admin", error);
  }
};

module.exports.getCheckEmployer = async (req, res, next) => {
  try {
    const getCheckEmployer = await getCheckEmployerService(req);
    if (!getCheckEmployer) {
      resStatusErrorIf(res, "find check employer");
    }
    resStatusSuccess(res, "find check employer", getCheckEmployer);
  } catch (error) {
    resStatusError(res, "find check employer", error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await deleteUserService(req);
    resStatusSuccess(res, "delete user", deleteUser);
  } catch (error) {
    resStatusError(res, "delete user", error);
  }
};
