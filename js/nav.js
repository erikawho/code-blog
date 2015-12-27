var pageFunctions = {};

pageFunctions.closeNav = function() {
  //close dropdown
  if ($('.hamburger').css('display') !== 'none') {
    $('nav').slideUp(100);
  };
};

pageFunctions.dropDown = function() {
  $('.hamburger').on('click', function() {
    $('nav').toggle(100);
  });
};

pageFunctions.resized = function() {
  $(window).resize(function() {
    if (window.innerWidth >= 600) {
      $('nav.navigation').css('display', 'block');
    };
    if (window.innerWidth <= 600) {
      $('nav.navigation').css('display', 'none');
    };
  });
};

pageFunctions.dropDown();
pageFunctions.resized();
