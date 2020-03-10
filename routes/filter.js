$(document).ready(function() {

  $('select.category-filter').change(function(){
    let selectedCategory = $(this).children.val();


    if (tweetLength > 140) {
      $(this).siblings('.counter').addClass('over140');
    } else {
      $(this).siblings('.counter').removeClass('over140');
    }

    $(this).siblings('.counter').html(140 - tweetLength);
  });

});
