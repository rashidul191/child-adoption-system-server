const { getDb } = require("../utils/dbConnect");

module.exports.getCheckEligibilityForUserService = async (req) => {
  const db = getDb();
  const { email } = req.query;
  const query = { email: email };
  const result = await db.collection("check-eligible").find(query).toArray();
  return result;
};

module.exports.putCheckEligibilityService = async (req) => {
  const db = getDb();
  const { email } = req.params;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db
    .collection("check-eligible")
    .updateOne(filter, updateDoc, options);
  return result;

};
