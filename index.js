const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

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
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();
    const childCollection = client
      .db("child-adoption-system")
      .collection("all_child");

    const userCollection = client
      .db("child-adoption-system")
      .collection("users");

    const reviewCollection = client
      .db("child-adoption-system")
      .collection("reviews");

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
      );
      res.send({ result, token });
    });

    // app.get all user show to ui
    app.get("/allUsers", verifyJWT, async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    // app.put make admin
    app.put("/users/admin/:email", async (req, res) => {
      const email = req.params.email;

      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };

      const result = await userCollection.updateOne(filter, updateDoc);
      // console.log(result);
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
