const { getDb } = require("../utils/dbConnect");
const { sendMailWithGmail } = require("../utils/sendEmail");

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

  // send mail fo subscription
  const mailData = {
    to: [email],
    subject: "Subscribe our new letter to stay updated every moment",
    text: `Subscribe our new letter to stay updated every moment`,
    html: `
      <div>
         <p>Thanks for Subscript our blog</p>
         <p>Now you will get our new letter updates every moment</p>
      </div>
      `,
  };
  await sendMailWithGmail(mailData);

  return result;
};

module.exports.getSubscriptionService = async () => {
  const db = getDb();
  const result = await db.collection("subscription-email").find({}).toArray();
  return result;
};
