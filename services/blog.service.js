const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getBlogService = async () => {
  const db = getDb();
  const result = await db.collection("blogs").find({}).toArray();
  return result;
};

module.exports.postBlogService = async (req) => {
  const db = getDb();
  const result = await db.collection("blogs").insertOne(req.body);
  return result;
};

module.exports.getBlogByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("blogs").findOne(query);
  return result;
};

module.exports.deleteBlogByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("blogs").deleteOne(query);
  return result;
}
