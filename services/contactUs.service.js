const { getDb } = require("../utils/dbConnect");
const { sendMailWithGmail } = require("../utils/sendEmail");

module.exports.postContactUsService = async (req) => {
  const db = getDb();
  const result = await db.collection("contact-us").insertOne(req.body);
  //   console.log("post contact us: ", result);
  const mailData = {
    to: req?.body?.email,
    subject: `we are got your Message`,
    text: `we are got your Message`,
    html: `
        <div>
          <h4>Thanks you ${req?.body?.name}, We are received your message.</h4>
          <h4>We will reply to your message as soon as possible.</h4>
          <p>${req?.body?.message}</p>
        </div>
        `,
  };
  // await sendMailWithGmail(mailData);

  return result;
};
