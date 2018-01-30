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

  $("form").on('submit', function(event) {
    event.preventDefault();
    if ($("textarea").val().length === 0) {
      alert("Please enter something")
    } else if ($("textarea").val().length > 140) {
      alert("Enter a shorter tweet");
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: loadTweets
      })
    }
  });


  function loadTweets () {
    console.log("performing ajax call...");
    $.ajax({  //make Ajax GET request to /tweets and receive the array of tweets as JSON
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  };

  loadTweets(); //load tweets from db







});



function createTweetElement(obj) {
  let profile_pic = obj["user"].avatars.small;
  let fullname = obj["user"].name;
  let handle = obj["user"].handle;
  let tweet_text = obj["content"].text;
  let created_at = obj["created_at"];

  $tweet = (`
    <article class="tweet">
    <header>
    <img class="profile-pic" src="${profile_pic}">
    <span id="fullname"> ${fullname} </span>
    <span id="handle">${handle}</span>
    </header>
    <p id="tweet-text">${tweet_text}</p>
    <footer>
    <span id="created-at">${created_at}</span>
    <div id="icons">
    <img id="flag" src="/images/flag.png">
    <img id="retweet" src="/images/retweet.png">
    <img id="like" src="/images/like.png">
    </div>
    </footer>
    </article>
    `);

  return $tweet;
}


function renderTweets(data) {
  for (tweet of data) {
    $("#all-tweets").append(createTweetElement(tweet));
  }
}








