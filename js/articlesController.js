var articlesController = {};

articlesController.getTemplate = function(ctx, next) {
  $.get('/template/handlebars-template.html', function(data, message, xhr) {
    articlesView.template = Handlebars.compile(data);
    console.log('get template should be first');
    next();
  });
};

articlesController.loadDB = function(ctx, next) {
  webDB.execute('DELETE FROM articles;');
  $.getJSON('/util/articles.json', function(data) {
    data.forEach(function(ele, index, array) {
      var newArticle = new Article(ele);
      Article.insert(newArticle);
    });
    next();
  });
};

articlesController.index = function(ctx, next) {
  var articlesAll = function(data) {
    console.log('in articlesController.index');
    ctx.articles = data.map(function(ele, index, array) {
      return new Article(ele);
    });
    //moves on to the next function in the ROUTER page() list
    next();
  };
  Article.findAll(articlesAll);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    console.log('in articlesController.category');
    console.log(data);
    // save data from our findByCategory function
    ctx.articles = data.map(function(ele, index, array) {
      return new Article(ele);
    });
    //moves on to the next function in the ROUTER page() list
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articlesController.author = function(ctx, next) {
  var authorData = function(data) {
    console.log('in articlesController.author');
    console.log(data);
    ctx.articles = data.map(function(ele, index, array) {
      return new Article(ele);
    });
    next();
  };
  Article.findByAuthor(ctx.params.author, authorData);
};

// articlesController.title = function(ctx, next) {
//   var titleData = function(data) {
//     console.log('in articlesController.title');
//     console.log(data);
//     ctx.articles = data.map(function(ele, index, array) {
//       return new Article(ele);
//     });
//     next();
//   };
//   Article.findByTitle(ctx.params.title, titleData);
// };

articlesController.show = function(ctx, next) {
  console.log('in articlesController.show');
  // articles is the data that we found in Article.findByCategory
  articlesView.show(ctx.articles);
};
