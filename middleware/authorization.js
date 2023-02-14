const { getDb } = require("../utils/dbConnect");

module.exports = async (req, res, next) => {
  const db = getDb();
  const query = { email: req.user.email };
  const requesterAccount = await db.collection("users").findOne(query);
  if (requesterAccount?.role === "admin" || "employer") {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// module.exports = (...role) => {
//   console.log("role: ", role);
//   // res.json("success");
//   const test = (req, res, next) => {
//     console.log("user role: ", req.user);
//     // const userRole = req.user.role;
//     // if (!role.includes(userRole)) {
//     //   return res.status(403).json({
//     //     status: "fail",
//     //     message: "You are not authorized to access",
//     //   });
//     // }
//     next();
//   };
//   return test;
// };
