$(document).ready(function() {
  
  function loadTweets () {
    console.log("performing ajax call...");
    $('#all-tweets').empty();
    $.ajax({ //make Ajax GET request to /tweets and receive the array of tweets as JSON
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
    
  };
  
  loadTweets(); //load existing tweets from db
  
  
  $(document).on("mouseover", "article.tweet", function() { //applying event handler to entire document, since some tweets will be generated after the page loads initially
    $(this).css("border", "1.5px solid darkgrey"); //using $(this) to apply hover state change to one article.tweet instead of all tweets
    $(this).find("#icons").css("display", "block");
    $(this).find("#fullname").css("color", "#244751");
  });
  
  $(document).on("mouseleave", "article.tweet", function() {
    $(this).css("border", "1.5px solid lightgrey");
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
      $(".counter").text("Character(s) remaining: 140")
    }
  });
  
  $(".compose").on('click', function() {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  });
});

//this escape function will take insecure text and create a temporary div element and use .createTextNode to "secure" text
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
  
  let elapsedTime = Date.now() - created_at;
  let elapsedTimeInSeconds = Math.floor(elapsedTime / 1000) + 1;
  let elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);
  let elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);
  let elapsedTimeInDays = Math.floor(elapsedTimeInHours / 24);
  let elapsedTimeInWeeks = Math.floor(elapsedTimeInDays / 7);
  let displayMessage = "";
  
  if (elapsedTimeInSeconds <= 59) {
    displayMessage = `Posted ${elapsedTimeInSeconds}s ago`
  } if (elapsedTimeInSeconds > 59) {
    displayMessage = `Posted ${elapsedTimeInMinutes}m ago`
  } if (elapsedTimeInMinutes > 59) {
    displayMessage = `Posted ${elapsedTimeInHours}h ago`
  } if (elapsedTimeInHours > 23) {
    displayMessage = `Posted ${elapsedTimeInDays}d ago`
  } if (elapsedTimeInDays > 6) {
    displayMessage = `Posted ${elapsedTimeInWeeks}w ago`
  }
  
  
  
  $tweet = (`
  <article class="tweet">
  <header>
  <img class="profile_pic" src="${escape(profile_pic)}">
  <span id="fullname"> ${escape(fullname)} </span>
  <span id="handle">${escape(handle)}</span>
  </header>
  <p id="tweet_text">${escape(tweet_text)}</p>
  <footer>
  <span id="created_at">${escape(displayMessage)}</span>
  <div id="icons">
  <i class="far fa-heart" id="like"></i>
  <i class="fas fa-retweet" id="retweet"></i>
  <i class="far fa-flag" id="flag"></i>
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








