const { getDb } = require("../utils/dbConnect");

module.exports.getReviewService = async () => {
  const db = getDb();
  const result = await db.collection("reviews").find({}).toArray();
  return result;
};

module.exports.putReviewService = async (req) => {
  const db = getDb();
  const filter = { email: req.params.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body, // review
  };
  const result = await db
    .collection("reviews")
    .updateOne(filter, updateDoc, options);
  return result;
};
