var blog = {};
blog.holdArticles = [];

blog.loadArticles = function() {
  $.get('/template/handlebars-template.html', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: '/util/articles.json',
      success: blog.checkForNewArticles
    });
  });
};

blog.checkForNewArticles = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('eTag');
  if (!localStorage.articlesEtag || localStorage.articlesEtag != eTag) {
    console.log('new eTag!');
    localStorage.articlesEtag = eTag;
    blog.holdArticles = [];
    webDB.execute(
      'DELETE FROM articles'
      , blog.fetchJSON
    );
  } else {
    console.log('eTag match!');
    blog.pullFromDB();
  }
};

blog.fetchJSON = function() {
  $.getJSON('/util/articles.json', blog.updateFromJSON);
};

blog.updateFromJSON = function (data) {
  data.forEach(function(ele, index, array) {
    var newArticle = new Article(ele);
    blog.holdArticles.push(newArticle);
  });
  blog.sendReceiveDB();
};

blog.sendReceiveDB = function() {
  blog.sortRawData();
  blog.holdArticles.forEach(function(ele, index, array) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, marked(ele.markdown)]
        }
      ]
    );
  });
  blog.pullFromDB();
  blog.render();
};

blog.pullFromDB = function() {
  webDB.execute(
    'SELECT * FROM articles'
    , function(resultArray) {
      blog.allArticles = [];
      resultArray.forEach(function(ele) {
        var newArticle = new Article(ele);
        blog.allArticles.push(new Article(newArticle));
      });
    }
  );
};

blog.render = function() {
  blog.allArticles.forEach(function(ele, index, array) {
    $('main').append(ele.toHTML());
  });
  blog.authorFilter();
  blog.categoryFilter();
  blog.minimizeArticles();
  blog.applyHighlighter();
  blog.titleFilter();
};

blog.sortRawData = function() {
  blog.holdArticles.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) return -1;
    if (a.publishedOn < b.publishedOn) return 1;
    return 0;
  });
};
