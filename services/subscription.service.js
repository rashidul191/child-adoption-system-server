const { getDb } = require("../utils/dbConnect");

module.exports.putSubscriptionService = async (req) => {
  const db = getDb();
  const { email } = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db
    .collection("subscription-email")
    .updateOne(filter, updateDoc, options);
  return result;
};

module.exports.getSubscriptionService = async () => {
  const db = getDb();
  const result = await db.collection("subscription-email").find({}).toArray();
  return result;
};
