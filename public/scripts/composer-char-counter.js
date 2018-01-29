$(document).ready(function() {
    $(".new-tweet textarea").on('keypress', function() {
        // var charCount = this.val()
        // console.log($(".new-tweet textarea").length); //this only totals to "1" every time a key is pressed
        var charCount = $(this).val().length + 1;
        var charLeft = 140 - charCount;
        console.log(charLeft); //this totals the correct number of characters within textarea
        $(".new-tweet .counter").text(charLeft);

        if (charLeft < 0) {
          $(".new-tweet .counter").addClass("overlimit");
        } else {
          $(".new-tweet .counter").removeClass("overlimit");
        }
    });
  });