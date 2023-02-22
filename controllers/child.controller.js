const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const {
  getChildService,
  childLengthService,
  postChildService,
  getChildByIdService,
  deleteChildByIdService,
  childTypesService,
  patchChildByIdService,
} = require("../services/child.service");

module.exports.getChild = async (req, res, next) => {
  try {
    const getChild = await getChildService();
    if (!getChild) {
      resStatusError(res, "get child");
    }
    resStatusSuccess(res, "get child", getChild);
  } catch (error) {
    resStatusError(res, "get child", error);
  }
};

module.exports.childLength = async (req, res, next) => {
  try {
    const childLength = await childLengthService();
    if (!childLength) {
      resStatusError(res, "get child length");
    }
    resStatusSuccess(res, "get child length", childLength);
  } catch (error) {
    resStatusError(res, "get child length", error);
  }
};

module.exports.postChild = async (req, res, next) => {
  try {
    const postChild = await postChildService(req);
    if (!postChild.insertedId) {
      resStatusError(res, "create child");
    }
    resStatusSuccess(res, "create child", postChild);
  } catch (error) {
    resStatusError(res, "create child", error);
  }
};

module.exports.getChildById = async (req, res, next) => {
  try {
    const getChildById = await getChildByIdService(req);
    if (!getChildById) {
      resStatusError(res, "get child by id");
    }
    resStatusSuccess(res, "get child by id", getChildById);
  } catch (error) {
    resStatusError(res, "get child by id", error);
  }
};

module.exports.deleteChildById = async (req, res, next) => {
  try {
    const deleteChildById = await deleteChildByIdService(req);
    if (!deleteChildById.deletedCount) {
      resStatusError(res, "delete child by id");
    }
    resStatusSuccess(res, "delete child by id", deleteChildById);
  } catch (error) {
    resStatusError(res, "delete child by id", error);
  }
};

module.exports.childTypes = async (req, res, next) => {
  try {
    const childTypes = await childTypesService(req);
    if (!childTypes) {
      resStatusError(res, "get child");
    }
    resStatusSuccess(res, "get child types", childTypes);
  } catch (error) {
    resStatusError(res, "get child types ", error);
  }
};

module.exports.patchChildById = async (req, res, next) => {
  try {
    const patchChildById = await patchChildByIdService(req);
    if (!patchChildById.modifiedCount) {
      resStatusErrorIf(res, "update child info");
    }
    resStatusSuccess(res, "update child info", patchChildById);
  } catch (error) {
    resStatusError(res, "update child info", error);
  }
};
