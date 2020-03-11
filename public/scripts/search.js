

$(document).ready(function () {

  $('.search-icon').on("click", function () {
    let keyword = $('input[id="searchContent"]').val().toLowerCase();

    $('#hooksContainer').children().each(function () {
      if ($(this).find('.titleSpan, .post-description').text().toLowerCase().search(keyword) > -1) {
        $(this).slideDown();
      } else {
        $(this).slideUp();
      }
    });
  });
});
