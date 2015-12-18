var articleController = {};

articleController.index = function() {
  Article.loadAll(articleView.index);
};

articleController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articleController.author = function(ctx, next) {
  var authorData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByAuthor(ctx.params.category, categoryData );
};

articleController.title = function(ctx, next) {
  var titleData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByTitle(ctx.params.category, categoryData);
};

articleController.show = function(ctx) {
  articleView.show(ctx.articles);
};
