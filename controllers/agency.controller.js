const { resStatusSuccess, resStatusError } = require("../middleware/ResStatus");
const {
  getAgencyServices,
  postAgencyService,
  getAgencyByIdService,
  deleteAgencyByIdService,
} = require("../services/agency.service");

// get Agency
module.exports.getAgency = async (req, res, next) => {
  try {
    const allAgency = await getAgencyServices();
    resStatusSuccess(res, "get agency", allAgency);
  } catch (error) {
    resStatusError(res, "get agency", error);
  }
};

// post Agency
module.exports.postAgency = async (req, res, next) => {
  try {
    const postAgency = await postAgencyService(req);
    if (!postAgency.insertedId) {
      resStatusError(res, "create agency");
    }
    resStatusSuccess(res, "create agency", postAgency);
  } catch (error) {
    resStatusError(res, "create agency", error);
  }
};

// get Agency By Id
module.exports.getAgencyById = async (req, res, next) => {
  try {
    const agencyById = await getAgencyByIdService(req);
    resStatusSuccess(res, "get agency by id", agencyById);
  } catch (error) {
    resStatusError(res, "get agency by id", error);
  }
};

// delete agency by id
module.exports.deleteAgencyById = async (req, res, next) => {
  try {
    const deleteAgencyById = await deleteAgencyByIdService(req);
    if (!deleteAgencyById.deletedCount) {
      resStatusError(res, "delete agency by id");
    }
    resStatusSuccess(res, "delete agency by id", deleteAgencyById);
  } catch (error) {
    resStatusError(res, "delete agency by id", error);
  }
};
