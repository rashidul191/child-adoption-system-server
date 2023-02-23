const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const { postContactUsService } = require("../services/contactUs.service");

module.exports.postContactUs = async (req, res, next) => {
  try {
      const postContactUs = await postContactUsService(req);
      console.log("post contact us: ",postContactUs)
    if (!postContactUs.insertedId) {
      resStatusErrorIf(res, "post contact us");
    }
    resStatusSuccess(res, "post contact  us", postContactUs);
  } catch (error) {
    resStatusError(res, "post contact us", error);
  }
};
