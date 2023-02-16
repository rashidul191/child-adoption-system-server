const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
const { sendMailWithGmail } = require("../utils/sendEmail");

module.exports.getChildApplyService = async () => {
  const db = getDb();
  const result = await db.collection("child-apply").find({}).toArray();
  return result;
};

module.exports.postChildApplyService = async (req) => {
  const db = getDb();
  const childApply = req.body;
  const result = await db.collection("child-apply").insertOne(childApply);
  if (result.insertedId) {
    // send mail
    const mailData = {
      to: [req.body.email],
      subject: `Child Application`,
      text: `Your Child's application has been received.
      Please wait a few times.
      As soon as possible you get a response.`,
      html: `
        <div>
          <img src="${req.body.child.img}" alt="img-here" />
          <h1>Child Name:  ${req.body.child.name} </h1>
          <p>Your Child's application has been received.</p>
          <p>Please wait a few times.</p>
          <p>As soon as possible you get a response.</p>
        </div>
        `,
    };
    await sendMailWithGmail(mailData);
  }

  return result;
};

module.exports.getChildApplyByIdService = async (req) => {
  const db = getDb();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await db.collection("child-apply").findOne(filter);
  return result;
};

module.exports.putChildApplyByIdService = async (req) => {
  const db = getDb();
  const id = req.params.id;

  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: { role: "approved" },
  };
  const getIdOfEmail = await db.collection("child-apply").findOne(filter);

  const result = await db
    .collection("child-apply")
    .updateOne(filter, updateDoc);

  if (result.modifiedCount) {
    // send mail
    const mailData = {
      to: [getIdOfEmail.email],
      subject: `Approved your child application`,
      text: `Approved your child application`,
      html: `
      <div>
        <h1 style = "color: green">🎉🎉 Congratulation  🎉🎉</h1>
        <img src="${getIdOfEmail.child.img}" alt="img-here" />
        <h1>Child Name:  ${getIdOfEmail.child.name} </h1>
        <p>Your Child's application has been Approved.</p>
        <p>Please!! As soon as possible contact-us.</p>
        <p>Phone: +8809696 860 878</p>
        <p>Email: casa@gmail.com</p>
      </div>
        `,
    };

    await sendMailWithGmail(mailData);
  }

  return result;
};

module.exports.deleteChildApplyByIdService = async (req) => {
  const db = getDb();
  const { id } = req.params;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("child-apply").deleteOne(query);
  return result;
};

module.exports.getChildApplyWithEmailService = async (req) => {
  const db = getDb();
  const email = req.query.email;
  const query = { email: email };
  const result = await db.collection("child-apply").find(query).toArray();
  return result;
  res.send(result);
};
