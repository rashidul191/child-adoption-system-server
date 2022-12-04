// const { MongoClient } = require("mongodb");
// // const connectionString = process.env.ATLAS_URI;
// // const connectionString = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.1pttxds.mongodb.net/?retryWrites=true&w=majority`;
// const connectionString = `mongodb+srv://child_adoption_system_admin:31oCZWFPqk80yiTC@cluster0.1pttxds.mongodb.net/?retryWrites=true&w=majority`;
// // const connectionString = `mongodb://127.0.0.1:27017`;
// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let dbConnection;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db("child-adoption-system");
//       console.log("Successfully connected to MongoDB.");

//       return callback();
//     });
//   },
//   getDb: function () {
//     return dbConnection;
//   },
// };
