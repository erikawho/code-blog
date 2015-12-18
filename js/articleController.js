var articleController = {};

articleController.index = function() {
  Article.loadAll(articleView.index);
};

articleController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData );
};

articleController.author = function(ctx, next) {
  console.log(ctx);
};

articleController.show = function(ctx, next) {
  articleView.show(ctx.articles);
};
