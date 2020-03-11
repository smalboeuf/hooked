$(document).ready(function() {

  $('select.category-filter').change(function(){
    let selectedCategory = $(this).children.val();

    for (const ele of $(document).userPosts[post])
    if (selectedCategory === ele.category) {
      ;
    } else {
      $(this).siblings('.counter').removeClass('over140');
    }

    $(this).siblings('.counter').html(140 - tweetLength);
  });

});
