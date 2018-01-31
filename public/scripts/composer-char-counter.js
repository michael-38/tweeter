$(document).ready(function() {
    $(".new-tweet textarea").on('input', function() {
        // var charCount = this.val()
        // console.log($(".new-tweet textarea").length); //this only totals to "1" every time a key is pressed
        var charCount = $(this).val().length;
        var charLeft = 140 - charCount;
        console.log(charLeft); //this totals the correct number of characters within textarea
        // $(".new-tweet .counter").text("Character(s) remaining: " + charLeft);
        $(this).siblings(".counter").text("Character(s) remaining: " + charLeft);

        if (charLeft < 0) {
          $(".new-tweet .counter").addClass("overlimit");
        } else {
          $(".new-tweet .counter").removeClass("overlimit");
        }
    });
  });