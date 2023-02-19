const express = require("express");
const cors = require("cors");
require("dotenv").config();
const errorHandle = require("./middleware/errorHandle");
const { connectToServer } = require("./utils/dbConnect");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const agencyRouter = require("./routers/v1/agency.router");
const userRouter = require("./routers/v1/user.router");
const childRouter = require("./routers/v1/child.router");
const reviewRouter = require("./routers/v1/review.router");
const blogRouter = require("./routers/v1/blog.router");
const userCommentRouter = require("./routers/v1/userComment.router");
const paymentRouter = require("./routers/v1/payment.router");
const childApplyRouter = require("./routers/v1/childApply.router");
const checkEligibilityRouter = require("./routers/v1/checkEligibility.router");
const subscriptionRouter = require("./routers/v1/subscription.router");

// server
connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("listen port: ", port);
    });
  } else {
    console.log("Error Find :", err);
  }
});

// get response server root path
app.get("/", (req, res) => {
  res.send("Running Child-Adoption-System server side");
});

// router
app.use("/api/v1/agency", agencyRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/child", childRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/userComment", userCommentRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/childApply", childApplyRouter);
app.use("/api/v1/checkEligibility", checkEligibilityRouter);
app.use("/api/v1/subscription", subscriptionRouter);

// global error handle function
app.use(errorHandle);

// listen port
// app.listen(port, () => {
//   console.log("listen port: ", port);
// });

module.exports = app;
