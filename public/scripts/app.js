/*
 * Client-side JS logic goes here
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 
 $(document).ready(function() {

  function loadTweets () {
    console.log("performing ajax call...");
    $('#all-tweets').empty();
    $.ajax({  //make Ajax GET request to /tweets and receive the array of tweets as JSON
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  };

  loadTweets(); //load existing tweets from db


$(document).on("mouseover", "article.tweet", function() { //apply event handler to entire document, since some tweets are generated after the page loads
    $(this).css("border", "1px solid black"); //using $(this) to apply hover state change to one article.tweet instead of all tweets
    $(this).find("#icons").css("display", "block");
    $(this).find("#fullname").css("color", "#244751");
  });

  $(document).on("mouseleave", "article.tweet", function() {
    $(this).css("border", "1px solid lightgrey");
    $(this).find("#icons").css("display", "none");
    $(this).find("fullname").css("color", "#377182");
  });


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
    $("textarea").val("");
    }
  });

$(".compose").on('click', function() {
  $(".new-tweet").slideToggle();
  $(".new-tweet textarea").focus();
});


});


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

 function createTweetElement(obj) {
  let profile_pic = obj["user"].avatars.small;
  let fullname = obj["user"].name;
  let handle = obj["user"].handle;
  let tweet_text = obj["content"].text;
  let created_at = obj["created_at"];

  $tweet = (`
    <article class="tweet">
      <header>
        <img class="profile_pic" src="${escape(profile_pic)}">
        <span id="fullname"> ${escape(fullname)} </span>
        <span id="handle">${escape(handle)}</span>
      </header>
      <p id="tweet_text">${escape(tweet_text)}</p>
      <footer>
        <span id="created_at">${escape(created_at)}</span>
        <div id="icons">
          <img id="flag" src="/images/flag.png">
          <img id="retweet" src="/images/retweet.png">
          <img id="like" src="/images/like.png">
        </div>
      </footer>
    </article>`
  );

  return $tweet; //note: this only returns html text, and not added to the DOM (use append/prepend to add to DOM so the tweet renders)
}

function renderTweets(data) {
  for (tweet of data) {
    $("#all-tweets").prepend(createTweetElement(tweet));
  }
}








