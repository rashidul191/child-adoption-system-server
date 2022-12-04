// const { getDb } = require("../utils/dbConnect");

// // get check eligibility
// module.exports.getCheckEligibilityForUser = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const { email } = req.query;
//     const query = { email: email };
//     const result = await db.collection("check-eligible").find(query).toArray();
//     res.send(result);
//   } catch (error) {
//     next(error);
//   }
// };

// // update check eligibility
// module.exports.patchCheckEligibility = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const checkEligibilityResult = req.body;
//     // console.log(checkEligibilityResult);
//     const filter = { email: req.params.email };

//     console.log(checkEligibilityResult);
//     console.log(filter);
//     // const options = { upsert: true };
//     // const updateDoc = {
//     //   $set: checkEligibilityResult,
//     // };
//     // const result = await db
//     //   .collection("check-eligible")
//     //       .updateOne(filter, updateDoc, options);

//     //   res.send(result);

//     res.json("success");
//   } catch (error) {
//     next(error);
//   }
// };
