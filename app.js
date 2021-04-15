const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongodb } = require("./config/keys");
// const mongodb = require('mongodb');
// const {MongoClient} = require('mongodb');
// const uri = "mongodb+srv://admin:AdminUser123@cluster0.i5gbr.mongodb.net/todo?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;
// DB Connection logic import
// const { initialize } = require('./dbconnection');
//make object of express so that we can use methods
let app = express();
// let dbobj;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    try {
      console.log("Connected to Database");
    } catch (err) {
      throw err;
    }
  }
);

// initialize('todo', (db)=>{
//     dbobj = db;
// },(err)=>{
//     console.log("Error while connecting to db", err)
// })

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware
// const whitelist = ['http://localhost:3000'​, 'http://localhost:5000'​, 'https://shrouded-journey-38552.heroku...​']
// const whitlist = ['http://localhost:3000'​, 'http://localhost:5000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// Routers
const userRouter = require("./Routes/userRoutes");
const todosRouter = require("./Routes/todosRoutes");
const groupRouter = require("./Routes/groupRoutes");

// Set up routes
app.use("/users", userRouter);
app.use("/todos", todosRouter);
app.use("/groups", groupRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is running on port ${port}`);
});
