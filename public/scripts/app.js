/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



 $(document).ready(function() {
  $("article.tweet").on({
    mouseover: function() {
      $("article.tweet #icons").css("display", "block")
      console.log("activated");
    },
    mouseleave: function() {
      $("article.tweet #icons").css("display", "none")
    }
  })
});