const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getChildApplyService = async () => {
  const db = getDb();
  const result = await db.collection("child-apply").find({}).toArray();
  return result;
};

module.exports.postChildApplyService = async (req) => {
  const db = getDb();
  const childApply = req.body;
  const result = await db.collection("child-apply").insertOne(childApply);
  return result;
};

module.exports.getChildApplyByIdService = async (req) => {
  const db = getDb();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await db.collection("child-apply").findOne(filter);
  return result;
};

module.exports.putChildApplyByIdService = async (req) => {
  const db = getDb();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: { role: "approved" },
  };
  const result = await db
    .collection("child-apply")
    .updateOne(filter, updateDoc);
  return result;
};

module.exports.deleteChildApplyByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("child-apply").deleteOne(query);
  return result;
};

module.exports.getChildApplyWithEmailService = async (req) => {
  const db = getDb();
  const email = req.query.email;
  const query = { email: email };
  const result = await db.collection("child-apply").find(query).toArray();
  return result;
  res.send(result);
};
