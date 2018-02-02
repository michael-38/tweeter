$(document).ready(function() {
    $(".new-tweet textarea").on('input', function() {
        var charCount = $(this).val().length;
        var charLeft = 140 - charCount;
        // $(".new-tweet .counter").text("Character(s) remaining: " + charLeft); //this is eqivalent to the line below
        $(this).siblings(".counter").text("Character(s) remaining: " + charLeft);

        if (charLeft < 0) {
          $(".new-tweet .counter").addClass("overlimit");
        } else {
          $(".new-tweet .counter").removeClass("overlimit");
        }
    });
  });