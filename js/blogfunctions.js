var blog = {};

blog.authorFromDB = function() {
  $('.authorFilter').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT author FROM articles ORDER BY author'
    , function(resultArray) {
      blog.uniqueAuthors = resultArray;
      resultArray.forEach(function(ele) {
        $('.authorFilter').append('<option>' + ele.author + '</option>');
      });
    }
  );
};

blog.categoryFromDB = function() {
  $('.categoryFilter').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT category FROM articles ORDER BY category'
    , function(resultArray) {
      blog.uniqueCategories = resultArray;
      resultArray.forEach(function(ele) {
        $('.categoryFilter').append('<option>' + ele.category + '</option>');
      });
    }
  );
};

blog.titleFromDB = function() {
  $('.titleFilter').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT title FROM articles ORDER BY title'
    , function(resultArray) {
      blog.uniqueTitles = resultArray;
      resultArray.forEach(function(ele) {
        $('.titleFilter').append('<option>' + ele.title + '</option>');
      });
    }
  );
};

blog.authorSelect = function() {
  $('.authorFilter').on('change', function() {
    page('/author/' + $(this).val());
  });
};

blog.categorySelect = function() {
  $('.categoryFilter').on('change', function() {
    page('/category/' + $(this).val());
  });
};

blog.titleSelect = function() {
  $('.titleFilter').on('change', function() {
    page('/title/' + $(this).val());
  });
};

blog.resetFilters = function() {
  $('.categoryFilter').find('option:first').attr('selected', 'selected');
  $('.authorFilter').find('option:first').attr('selected', 'selected');
  $('.titleFilter').find('option:first').attr('selected', 'selected');
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
  blog.categoryFromDB();
  blog.authorFromDB();
  blog.titleFromDB();
  blog.categorySelect();
  blog.authorSelect();
  blog.titleSelect();
};
