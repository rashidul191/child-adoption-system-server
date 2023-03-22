const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const {
  getChildApplyService,
  postChildApplyService,
  getChildApplyByIdService,
  putChildApplyByIdService,
  deleteChildApplyByIdService,
  getChildApplyWithEmailService,
  getChildApprovedService,
} = require("../services/childApply.service");

module.exports.getChildApply = async (req, res, next) => {
  try {
    const getChildApply = await getChildApplyService();
    if (!getChildApply) {
      resStatusErrorIf(res, "get child apply");
    }
    resStatusSuccess(res, "get child apply", getChildApply);
  } catch (error) {
    resStatusError(res, "get child apply", error);
  }
};

module.exports.postChildApply = async (req, res, next) => {
  try {
    const postChildApply = await postChildApplyService(req);
    if (!postChildApply.insertedId) {
      resStatusErrorIf(res, "post child apply");
    }
    resStatusSuccess(res, "post child apply", postChildApply);
  } catch (error) {
    resStatusError(res, "post child apply", error);
  }
};

module.exports.getChildApplyById = async (req, res, next) => {
  try {
    const getChildApplyById = await getChildApplyByIdService(req);
    if (!getChildApplyById) {
      resStatusErrorIf(res, "get child apply");
    }
    resStatusSuccess(res, "get child apply", getChildApplyById);
  } catch (error) {
    resStatusError(res, "get child apply", error);
  }
};

module.exports.putChildApplyById = async (req, res, next) => {
  try {
    const putChildApplyById = await putChildApplyByIdService(req);
    if (!putChildApplyById.modifiedCount) {
      resStatusErrorIf(res, "update child apply by id");
    }
    resStatusSuccess(res, "update child apply by id", putChildApplyById);
  } catch (error) {
    resStatusError(res, "update child apply by id", error);
  }
};

module.exports.deleteChildApplyById = async (req, res, next) => {
  try {
    const deleteChildApplyById = await deleteChildApplyByIdService(req);
    if (!deleteChildApplyById.deletedCount) {
      resStatusErrorIf(res, "delete child apply by id");
    }
    resStatusSuccess(res, "delete child apply by id", deleteChildApplyById);
  } catch (error) {
    resStatusError(res, "delete child apply by id", error);
  }
};

module.exports.getChildApplyWithEmail = async (req, res, next) => {
  try {
    const getChildApplyWithEmail = await getChildApplyWithEmailService(req);
    resStatusSuccess(res, "get child apply with email", getChildApplyWithEmail);
  } catch (error) {
    resStatusError(res, "get child apply with email", error);
  }
};

module.exports.getChildApproved = async (req, res, next) => {
  try {
    const childApproved = await getChildApprovedService();
    resStatusSuccess(res, "get child approved data", childApproved);
  } catch (error) {
    resStatusError(res, "get child approved data", error);
  }
};
