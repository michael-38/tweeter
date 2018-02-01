"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function(db) { //takes in the active db connection, then I can do things with db (i.e. db.collection.insertOne, etc.)
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, null, callback);
        
        // callback(err, results)
        // callback(null, true); //instead of "true", we can pass other parameters from the database (i.e. _id, etc.)
      },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection("tweets").find().sort({created_at: 1}).toArray(callback)
        }
      
        //null is the err being passed to the DataHelper.getTweets (in the tweet.js file);
      }
    }

