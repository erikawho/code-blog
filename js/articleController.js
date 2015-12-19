var articleController = {};

articleController.index = function() {
  Article.loadAll(articleView.index);
};

articleController.category = function(ctx, next) {
  Article.loadAll(function() {
    var categoryData = function(articles) {
      ctx.articles = articles;
      next();
    };
    Article.findByCategory(ctx.params.category, categoryData);
  });
};

articleController.author = function(ctx, next) {
  var authorData = function(articles) {
    ctx.articles = articles;
    next();
  };
  Article.findByAuthor(ctx.params.category, categoryData );
};

articleController.title = function(ctx, next) {
  var titleData = function(articles) {
    ctx.articles = articles;
    next();
  };
  Article.findByTitle(ctx.params.category, categoryData);
};

articleController.show = function(ctx) {
  articleView.show(ctx.articles);
};
