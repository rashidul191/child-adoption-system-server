const { getDb } = require("../utils/dbConnect");
// payment secret key .env
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// stripe payment, it is not save my database
module.exports.cardOfPaymentService = async (req) => {
  const cardAmount = req.body.amount;
  // console.log("card Payment: ", cardAmount);
  const amount = cardAmount * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  // res.send({ clientSecret: paymentIntent.client_secret });
  return { clientSecret: paymentIntent.client_secret };
};

module.exports.getPaymentService = async () => {
  const db = getDb();
  const result = await db.collection("payment").find({}).toArray();
  return result;
};

module.exports.postPaymentService = async (req) => {
  const db = getDb();
  const result = await db.collection("payment").insertOne(req.body.donation);
  return result;
};
