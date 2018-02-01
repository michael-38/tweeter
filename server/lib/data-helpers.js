"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function(db) { //takes in the active db connection, so we can use specific methods (i.e. db.collection.insertOne, etc.)
  return {
    
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().sort({created_at: 1}).toArray(callback)
    },
    
    
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback); 
    }
  }
};

//note: almost all MongoDB methods require a callback.