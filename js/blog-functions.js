var blog = {};

blog.authorFromDB = function() {
  $('.articleAuthor').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT author FROM articles ORDER BY author'
    , function(resultArray) {
      blog.uniqueAuthors = resultArray;
      resultArray.forEach(function(ele) {
        $('.articleAuthor').append('<option>' + ele.author + '</option>');
      });
    }
  );
};

blog.categoryFromDB = function() {
  $('.articleCategory').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT category FROM articles ORDER BY category'
    , function(resultArray) {
      blog.uniqueCategories = resultArray;
      resultArray.forEach(function(ele) {
        $('.articleCategory').append('<option>' + ele.category + '</option>');
      });
    }
  );
};

blog.titleFromDB = function() {
  $('.articleTitle').children('option:nth-child(n+2)').remove();
  webDB.execute(
    'SELECT DISTINCT title FROM articles ORDER BY title'
    , function(resultArray) {
      blog.uniqueTitles = resultArray;
      resultArray.forEach(function(ele) {
        $('.articleTitle').append('<option>' + ele.title + '</option>');
      });
    }
  );
};

blog.authorSelect = function() {
  $('.articleAuthor').on('change', function() {
    page('/author/' + $(this).val());
  });
};

blog.categorySelect = function() {
  $('.articleCategory').on('change', function() {
    page('/category/' + $(this).val());
  });
};

blog.titleSelect = function() {
  $('.articleTitle').on('change', function() {
    page('/title/' + $(this).val());
  });
};

blog.resetFilters = function() {
  $('.articleAuthor').find('option:first').attr('selected', 'selected');
  $('.articleCategory').find('option:first').attr('selected', 'selected');
  $('.articleTitle').find('option:first').attr('selected', 'selected');
};

blog.minimizeArticles = function() {
  $('.collapse').hide();

  $('main').each(function() {
    $('.bodyText').children().hide();
    $('.bodyText :nth-child(-n+2)').show();
  });

  blog.expand();
  blog.collapse();
};

blog.expand = function() {
  $('main').on('click', '.expand', function(event) {
    $this = $(this);
    event.preventDefault();
    $this.hide();
    $this.next().show();
    $this.prev().children().show();
  });
};

blog.collapse = function() {
  $('main').on('click', '.collapse', function(event) {
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
  blog.titleFromDB();
  blog.authorSelect();
  blog.categorySelect();
  blog.titleSelect();
};
