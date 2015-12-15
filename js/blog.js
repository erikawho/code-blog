var blog = {};
blog.article = [];

blog.createAll = function() {
  this.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
};

blog.populate = function() {
  for (var i = 0; i < this.rawData.length; i++) {
    var temp = new Article(this.rawData[i]);
    temp.toHTML();
    this.article.push(temp);
    temp.categorytagsDropDown();
    temp.authortagsDropDown();
    temp.titletagsDropDown();
  }
};

blog.articles = function

blog.fetchFromDB = function(callback) {
  callback = callback || function() {};
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn',
    function (resultArray) {
      resultArray
    }
 }  )

blog.handleDeleteButton = function() {
  $('delete-article-button').on('click', function() {
    var id = $(this).data('article-id');
    var article = blog.buildArticle();
    article.id = id;
    article.deleteRecord(blog.clearAndFetch)

    blog.articles = [];
    Article.truncateTable(blog.fetchJSON)
    webDB.execute('DELETE FROM articles', blog.fetchJSON);
  } else {
    console.log('cache hit!');
    blog.fetchFromDB();
  }
};

blog.buildArticle = function() {}
// More content here

blog.loadArticleById = function(id) {
  Article.find(id, );
    webDB.execute(
      [
        {
        'sql'
        }
      ]
    )
}

blog.truncateArticle = function() {
  $('main p:not(:first-child)').hide();
  $('main').on('click', '.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('p:not(first-child)').toggle(); //'show' was 'read-on'
  });
};

$('select[id = "category"]').change(function() {
  $('#category').find('option:first').attr('selected', 'selected');
  $('main').find('article').show();
  console.log ($(this).val());

  if ($(this).val() !== 'none'){
    $('postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
  }
});

$('select[id = "author"]').change(function()  {
  $('#author').find('option:first').attr('selected', 'selected');
  $('main').find('article').show();
  console.log ($(this).val());

  if ($(this).val() !== 'none'){
    $('postAuthor:not(:contains(' + $(this).val() + '))').hide();
  }
});

$('select[id = "title"]').change(function() {
  $('#title').find('option:first').attr('selected', 'selected');
  $('main').find('article').show();
  console.log ($(this).val());

  if ($(this).val() !== 'none'){
    $('postTitle:not(:contains(' + $(this).val() + '))').hide();
  }
});


  //Nav tabs
// blog.handleMainNav = function() {
//     $('.main.-nav').on('click'. '.tab', function(e) {
//     $('.tab-content').hide();
//     $('#' + $(this).data('content')).fadeIn();
//     $('main-nav' '.tab:first').trigger('click');
// });
// };
