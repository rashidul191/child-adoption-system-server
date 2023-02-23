const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyJWT = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not a logged in",
        error: "UnAuthorized access",
      });
    }

    jwt?.verify(
      token,
      process.env.ACCESS_SECRET_KEY,
      function (error, decoded) {
        if (error) {
          return res.status(403).json({
            status: "fail",
            message: "Forbidden access",
            error: error?.message,
          });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    // console.log(error)
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
      error: error?.message,
    });
  }
};
