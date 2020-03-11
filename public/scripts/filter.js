

$(document).ready(function() {

  $('select.category-filter').change(function(){

    let selectedCategory = $(this).children("option:selected").val();

    $('#hooksContainer').children('div').each(function () {
      if (selectedCategory === 'all') {
        $(this).slideDown();
      } else if ($(this).attr('name') !== selectedCategory) {
        $(this).slideUp();
      } else {
        $(this).slideDown();
      }
  });

    // for (const ele of $('#hooksContainer').childNodes)
    //   if (ele.attribute.name === selectedCategory) {
    //     $(this).addClass('display', 'hidden');
    //   } else {
    //     $(this).removeClass('display');
    //   }

  });

});
