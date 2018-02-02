"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, results) => { //getTweets is a function that takes a callback function (refer to this function in the data-helpers.js file). The callback will be an anonymous function that has the err, results arguments. When a GET request is made to "/", the getTweets function will run (from the data-helpers.js file). Depending on what we get once we run getTweets, the callback function below will execute with the err, results arguments.
    if (err) {
      res.status(500).json({ error: err.message });
    } else { //if getTweets was able to retrieve something other than an err, then convert that array into JSON.
      res.json(results);
    }
  });
});

tweetsRoutes.post("/", function(req, res) {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }


  const user = req.body.user ? req.body.user : userHelper.generateRandomUser();//if req.body.user exists (i.e. a user is logged in), use that as the username, else generateRandomUser().
  const tweet = {
    user: user,
    content: {
      text: req.body.text
    },
    created_at: Date.now()
  };
  
  DataHelpers.saveTweet(tweet, (err, results) => { //saveTweet is a function that takes a "newTweet" and a callback function as its arguments (refer to this function in the data-helpers.js file). When a POST request is made to "/", the getTweets function will run (from the data-helpers.js file). Initially, const "tweet" (from here) is passed to saveTweet as the "newTweet" argument and will attempt to be inserted to the db.collection("tweets"). Depending on what we get (err or results) once we run getTweets, the callback function below will execute with the err, results arguments.
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).send();        
    }
  });
});

return tweetsRoutes;

};
