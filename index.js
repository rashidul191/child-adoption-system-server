const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.1pttxds.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// token verify jwt function
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized Access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log("Token Error: ", err);
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();
    // collection DB
    const childCollection = client
      .db("child-adoption-system")
      .collection("all_child");

    const userCollection = client
      .db("child-adoption-system")
      .collection("users");

    const reviewCollection = client
      .db("child-adoption-system")
      .collection("reviews");

    const agencyCollection = client
      .db("child-adoption-system")
      .collection("allAgency");

    const paymentCollection = client
      .db("child-adoption-system")
      .collection("payment");

    // verify Admin function
    const verifyAdmin = async (req, res, next) => {
      const requester = req.decoded.email;
      const query = { email: requester };
      const requesterAccount = await userCollection.findOne(query);
      if (requesterAccount.role === "admin") {
        next();
      } else {
        res.status(403).send({ message: "forbidden" });
      }
    };

    // payment system card
    app.post("/create-payment-intent", async (req, res) => {
      const cardAmount = req.body.amount;
      const amount = cardAmount * 100;
      // console.log(amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.post("/donation", async (req, res) => {
      const donation = req.body.donation;
      const result = await paymentCollection.insertOne(donation);
      res.send(result);
    });

    app.get("/allDonation", verifyJWT, async (req, res) => {
      const query = {};
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    // app.post method, child info store database
    app.post("/childInsert", async (req, res) => {
      const child = req.body;
      const result = await childCollection.insertOne(child);
      res.send(result);
    });

    // app.get method, show one child to id
    app.get("/child/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await childCollection.findOne(query);
      res.send(result);
    });

    // app.get method, show child types to ui
    app.get("/childs/:childType", async (req, res) => {
      const childType = req.params.childType;
      const query = { childType: childType };
      const result = await childCollection.find(query).toArray();
      res.send(result);
    });

    // app.get all child show ui
    app.get("/allChilds", verifyJWT, verifyAdmin, async (req, res) => {
      const query = {};
      const result = await childCollection.find(query).toArray();
      res.send(result);
    });

    // delete child use id
    app.delete("/allChilds/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await childCollection.deleteOne(query);
      res.send(result);
    });

    // app.put method, store all user in database
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      // console.log("user email : ",email);
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: req.body,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      // generate jwt sign token(64bit)
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1d" }
        // { expiresIn: "1m" }
      );
      res.send({ result, token });
    });

    // app.get all user show to ui
    app.get("/allUsers", verifyJWT, async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });
    // app.get individual user show to ui
    app.get("/user", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // app.put make admin
    app.put("/users/admin/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // app.put make employer
    app.put(
      "/users/employer/:email",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const email = req.params.email;
        const filter = { email: email };
        const updateDoc = {
          $set: { role: "employer" },
        };
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // app.get check admin find one
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user.role === "admin";
      res.send({ admin: isAdmin });
    });

    // app.delete user on database and show ui Admin Dashboard
    app.delete("/user/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // app.patch user review store database.
    app.patch("/reviews/:email", async (req, res) => {
      const review = req.body;
      const email = req.params.email;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: review,
      };
      const result = await reviewCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // app.post agency store Database
    app.post("/agency", verifyJWT, async (req, res) => {
      const agency = req.body;
      const result = await agencyCollection.insertOne(agency);
      res.send(result);
    });
    // app.get agency store Database
    app.get("/allAgency", async (req, res) => {
      const query = {};
      const result = await agencyCollection.find(query).toArray();
      res.send(result);
    });

    // app.get agency store Database
    app.get("/agency/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await agencyCollection.findOne(query);
      res.send(result);
    });

    // delete child use id
    app.delete("/allAgency/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await agencyCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);

// get response server root path
app.get("/", (req, res) => {
  res.send("Running Child-Adoption-System server side");
});

// listen port
app.listen(port, () => {
  console.log("listen port: ", port);
});
