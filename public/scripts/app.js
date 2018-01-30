/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 $(document).ready(function() {
  $("article.tweet").on({
    mouseover: function() {
      $("article.tweet #icons").css("display", "block")
      $("article.tweet").css("border", "1px solid black")
      $("article.tweet #fullname").css("color", "#244751")
    },
    mouseleave: function() {
      $("article.tweet #icons").css("display", "none")
      $("article.tweet").css("border", "1px solid lightgrey")
      $("article.tweet #fullname").css("color", "#377182")
    }
  })

});



const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


function createTweetElement(obj) {

}










