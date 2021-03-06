"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
  src: './stylesheets',
  dest: './public/css',
  prefix: '/css'
}))

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

// Originally, we were using an in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");
// *this db refers to the "initial-tweets.json"

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => { 
  if (err) throw err;
  //for MongoClient.connect, it connects to the MONGODB_URI and executes a callback after the connection attempt. If something goes wrong, an error object will bee populated to the err argument. If all goes well, the results of the connection will be populated to the db argument (and err will be null). The callback function takes in the err and db arguments and we can define what we do once the connection attempt has been executed.
  
  //db refers to an active connection (it doesn't have useful content for display). We are passing this as db instead of a (hard-coded) JSON because we need this to retrieve data (i.e. db.collection("tweets")...) from the database (when we get to the data-helpers.js).
  
  
  
  // Because data-helpers.js exports a function that expects the `db` as a parameter, we can require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);
  
  //Becasue tweets.js exports a function that expects the output from data-helpers.js, we can require it and pass the `DataHelpers` object immediately:
  const tweetsRoutes = require("./routes/tweets.js")(DataHelpers);
  
  //mounting "/tweets" as the path. When a request path matches the mounted path, the middleware function (tweetsRoutes) will execute.
  //any URL that ends with /tweets will be handled with tweetsRoutes
  //use different namespaces for different routes (i.e. users)
  app.use("/tweets", tweetsRoutes);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
