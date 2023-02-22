const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAgencyServices = async () => {
  const db = getDb();
  const result = await db.collection("allAgency").find({}).toArray();
  return result;
};

module.exports.postAgencyService = async (req) => {
  const db = getDb();
  const result = await db.collection("allAgency").insertOne(req.body);
  return result;
};

module.exports.getAgencyByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("allAgency")
    .findOne({ _id: ObjectId(id) });
  return result;
};

module.exports.deleteAgencyByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("allAgency")
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports.patchAgencyService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db.collection("allAgency").updateOne(filter, updateDoc);
  return result;
};
