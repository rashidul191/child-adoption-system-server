const { getDb } = require("../utils/dbConnect");
const { sendMailWithGmail } = require("../utils/sendEmail");

module.exports.getCheckEligibilityForUserService = async (req) => {
  const db = getDb();
  const { email } = req.query;
  const query = { email: email };
  const result = await db.collection("check-eligible").find(query).toArray();
  return result;
};

module.exports.putCheckEligibilityService = async (req) => {
  const db = getDb();
  const allowValue = req.body.allowValue;
  const notAllowValue = req.body.notAllowValue;
  const { email } = req.params;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: req.body,
  };

  const result = await db
    .collection("check-eligible")
    .updateOne(filter, updateDoc, options);
  if (result.acknowledged) {
    // send mail
    const mailData = {
      to: [email],
      subject: ` Adoption Eligible Score`,
      text: ` Adoption Eligible Score`,
      html: `
    <div>
      <p> Your adoption eligible score is : </p>
      <h1 style="color: green"> Yes: ${allowValue.length * 10} %</h1>
      <h1 style="color: red"> No: ${notAllowValue.length * 10} %</h1>     
     ${
       allowValue.length * 10 > 50
         ? '  <div>  <h3  style="color: green" > Congratulation </h3> <p>You are Eligible for Child Adoption</p></div> '
         : '<h1 style="color: red"> You are not Eligible for Child Adoption</h1>'
     }
    </div>
    `,
    };
    // await sendMailWithGmail(mailData);
  }

  return result;
};
