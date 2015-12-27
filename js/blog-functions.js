var blog = {};

blog.authorFromDB = function() {
  $('.artAuth').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT author FROM articles ORDER BY author'
    , function(resultArray) {
      blog.uniqueAuthors = resultArray;
      resultArray.forEach(function(ele) {
        $('.artAuth').append('<option>' + ele.author + '</option>');
      });
    }
  );
};

blog.categoryFromDB = function() {
  $('.artCat').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT category FROM articles ORDER BY category'
    , function(resultArray) {
      blog.uniqueCategories = resultArray;
      resultArray.forEach(function(ele) {
        $('.artCat').append('<option>' + ele.category + '</option>');
      });
    }
  );
};

// blog.titleFromDB = function() {
//   $('.artTit').children('option:nth-child(n+2)').remove();
//   webDB.execute(
//     'SELECT DISTINCT title FROM articles ORDER BY title'
//     , function(resultArray) {
//       blog.uniqueTitles = resultArray;
//       resultArray.forEach(function(ele) {
//         $('.artTit').append('<option>' + ele.title + '</option>');
//       });
//     }
//   );
// };

blog.authorSelect = function() {
  $('.artAuth').on('change', function() {
    page('/author/' + $(this).val());
  });
};

blog.categorySelect = function() {
  $('.artCat').on('change', function() {
    page('/category/' + $(this).val());
  });
};

// blog.titleSelect = function() {
//   $('.artTit').on('change', function() {
//     page('/title/' + $(this).val());
//   });
// };

blog.resetFilters = function() {
  $('.artAuth').find('option:first').attr('selected', 'selected');
  $('.artCat').find('option:first').attr('selected', 'selected');
  // $('.artTit').find('option:first').attr('selected', 'selected');
};

blog.minimizeArticles = function() {
  $('.read-less').hide();

  $('main').each(function() {
    $('.bodyText').children().hide();
    $('.bodyText :nth-child(-n+2)').show();
  });

  blog.readOn();
  blog.readLess();
};

blog.readOn = function() {
  $('main').on('click', '.read-on', function(event) {
    $this = $(this);
    event.preventDefault();
    $this.hide();
    $this.next().show();
    $this.prev().children().show();
  });
};

blog.readLess = function() {
  $('main').on('click', '.read-less', function(event) {
    event.preventDefault();
    var $this = $(this);
    var goTo = $($this).closest('.articlePost').offset();

    $this.hide();
    $this.prev().show();

    $this.prevAll('.bodyText').children().hide();
    $this.prevAll('.bodyText').children(':nth-child(-n+2)').show();

    //add smooth page scroll
    $('body').animate({
      scrollTop: goTo.top
    }, 200);

  });
};

blog.applyHighlighter = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

blog.viewFunctions = function() {
  blog.applyHighlighter();
  blog.minimizeArticles();
  blog.authorFromDB();
  blog.categoryFromDB();
  // blog.titleFromDB();
  blog.authorSelect();
  blog.categorySelect();
  // blog.titleSelect();
};
