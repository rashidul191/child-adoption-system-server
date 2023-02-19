const {
  resStatusError,
  resStatusSuccess,
  resStatusErrorIf,
} = require("../middleware/ResStatus");
const {
  getBlogService,
  postBlogService,
  getBlogByIdService,
  deleteBlogByIdService,
  postBlogWithIdService,
} = require("../services/blog.service");

module.exports.getBlog = async (req, res, next) => {
  try {
    const getBlog = await getBlogService();
    if (!getBlog) {
      resStatusError(res, "get blog");
    }
    resStatusSuccess(res, "get blog", getBlog);
  } catch (error) {
    resStatusError(res, "get blog", error);
  }
};

module.exports.postBlog = async (req, res, next) => {
  try {
    const postBlog = await postBlogService(req);
    if (!postBlog.insertedId) {
      resStatusError(res, "post blog");
    }
    resStatusSuccess(res, "post blog", postBlog);
  } catch (error) {
    resStatusError(res, "post blog", error);
  }
};

module.exports.getBlogById = async (req, res, next) => {
  try {
    const getBlogById = await getBlogByIdService(req);
    if (!getBlogById) {
      resStatusError(res, "get blog");
    }
    resStatusSuccess(res, "get blog", getBlogById);
  } catch (error) {
    resStatusError(res, "get blog", error);
  }
};

module.exports.deleteBlogById = async (req, res, next) => {
  try {
    const deleteBlogById = await deleteBlogByIdService(req);
    if (!deleteBlogById.deletedCount) {
      resStatusError(res, "delete blog");
    }
    resStatusSuccess(res, "delete blog", deleteBlogById);
  } catch (error) {
    resStatusError(res, "delete blog", error);
  }
};

// module.exports.postBlogWithId = async (req, res, next) => {
//   try {
//     const postBlogWithId = await postBlogWithIdService(req);
//     if (!postBlogService.insertedId) {
//       resStatusErrorIf(res, "post user comment");
//     }
//     resStatusSuccess(res, "post user comment", postBlogWithId);
//   } catch (error) {
//     resStatusError(res, "post user comment", error);
//   }
// };
