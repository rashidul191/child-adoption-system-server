const { getDb } = require("../utils/dbConnect");

module.exports.putUserService = async (req) => {
  const db = getDb();
  const filter = { email: req.params.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };
  const result = await db
    .collection("users")
    .updateOne(filter, updateDoc, options);
    // console.log(result);
  return result;
};

module.exports.getUserService = async () => {
  const db = getDb();
  const result = await db.collection("users").find({}).toArray();
  return result;
};
module.exports.getAllUserService = async () => {
  const db = getDb();
  const result = await db.collection("users").find({}).toArray();
  return result;
};

module.exports.getUserWithEmailService = async (req) => {
  const db = getDb();
  const query = { email: req.query.email };
  const result = await db.collection("users").findOne(query);
  return result;
};

module.exports.getUserLengthService = async () => {
  const db = getDb();
  const result = await db.collection("users").countDocuments({});
  return result;
};

module.exports.putMakeAdminService = async (req) => {
  const db = getDb();
  const filter = { email: req.params.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: { role: "admin" },
  };
  const result = await db
    .collection("users")
    .updateOne(filter, updateDoc, options);
  return result;
};
module.exports.putMakeEmployerService = async (req) => {
  const db = getDb();
  const filter = { email: req.params.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: { role: "employer" },
  };
  const result = await db
    .collection("users")
    .updateOne(filter, updateDoc, options);
  return result;
};

module.exports.getCheckAdminService = async (res, req) => {
  const db = getDb();
  const email = req.params.email;
  const query = { email: email };
  const user = await db.collection("users").findOne(query);
  const isAdmin = user.role === "admin";
  return { admin: isAdmin };
};
module.exports.getCheckEmployerService = async (req) => {
  const db = getDb();
  const email = req.params.email;
  const query = { email: email };
  const user = await db.collection("users").findOne(query);
  const isEmployer = user.role === "employer";
  return { employer: isEmployer };
};

module.exports.deleteUserService = async (req) => {
  const db = getDb();
  const query = { email: req.params.email };
  const result = await db.collection("users").deleteOne(query);
  return result;
};
