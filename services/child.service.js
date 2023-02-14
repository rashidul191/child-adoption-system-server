const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getChildService = async () => {
  const db = getDb();
  const result = await db.collection("all_child").find({}).toArray();
  return result;
};

module.exports.childLengthService = async () => {
  const db = getDb();
  const result = await db.collection("all_child").countDocuments({});
  return result;
};
module.exports.postChildService = async (req) => {
  const db = getDb();
  const child = req.body;
  const result = await db.collection("all_child").insertOne(child);
  return result;
};

module.exports.getChildByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("all_child").findOne(query);
  return result;
};

module.exports.deleteChildByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("all_child").deleteOne(query);
  return result;
};

module.exports.childTypesService = async (req) => {
  const db = getDb();
  const { childType } = req.params;
  const query = { childType: childType };
  const result = await db.collection("all_child").find(query).toArray();
  return result;
};
