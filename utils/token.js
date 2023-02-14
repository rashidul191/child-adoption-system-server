const jwt = require("jsonwebtoken");
// const { getDb } = require("./dbConnect");
require("dotenv").config();

module.exports.generateToken = (email) => {
  // const payload = {
  //   email: email,
  //   // email: userInfo?.email,
  //   // role: userInfo?.role,
  // };
  // const token = jwt?.sign(payload, process.env.ACCESS_SECRET_KEY, {
  //   expiresIn: "30d", // 30day
  //   //expiresIn: "1m", // 1minute
  // });

  const token = jwt?.sign(
    {
      email: email,
      //role: userInfo.role,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "30d" }
    // { expiresIn: "1m" }
  );
  return token;
};
