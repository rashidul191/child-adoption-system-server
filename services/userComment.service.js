const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.postUserCommentService = async (req) => {
  const db = getDb();
  const comment = req.body;
  const result = await db.collection("user_comments").insertOne(comment);
  return result;
};

module.exports.getUserCommentService = async () => {
  const db = getDb();
  const result = await db.collection("user_comments").find({}).toArray();
  return result;
};

module.exports.deleteCommentService = async (req) => {
  const db = getDb();
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("user_comments").deleteOne(query);
  return result;
};
