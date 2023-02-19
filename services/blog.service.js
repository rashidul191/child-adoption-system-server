const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
const { sendMailWithGmail } = require("../utils/sendEmail");

module.exports.getBlogService = async () => {
  const db = getDb();
  const result = await db.collection("blogs").find({}).toArray();
  return result;
};

module.exports.postBlogService = async (req) => {
  const db = getDb();
  const userMail = await db.collection("users").find({}).toArray();
  const subscriptionMail = await db
    .collection("subscription-email")
    .find({})
    .toArray();
  let userCurrentMail = [];
  for (mail of userMail) {
    userCurrentMail.push(mail.email);
  }
  for (subMail of subscriptionMail) {
    userCurrentMail.push(subMail.email);
  }
  const result = await db.collection("blogs").insertOne(req.body);
  const mailData = {
    to: userCurrentMail,
    subject: `${req.body.blogTitle}`,
    text: `${req.body.blogTitle}`,
    html: `
      <div>
        <img width={200} src="${req.body.blogImg}" alt="${req.body.blogTitle}" />
        <h1><a href='https://child-adoption-system.web.app/blog/${req.body.blogTitle}/${result.id}'> ${req.body.blogTitle}</a> </h1>
      </div>
      `,
  };
  await sendMailWithGmail(mailData);
  return result;
};

module.exports.getBlogByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("blogs").findOne(query);
  return result;
};

module.exports.deleteBlogByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("blogs").deleteOne(query);
  return result;
};

// module.exports.postBlogWithIdService = async (req) => {
//   const db = getDb();
//   const comment = req.body;
//   const result = await db.collection("user_comments").insertOne(comment);
//   return result;
// };
