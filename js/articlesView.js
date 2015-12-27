var articlesView = {};

articlesView.show = function(articles) {
  articlesView.renderGroup(articles);
  articlesView.ui();
};

articlesView.renderGroup = function(articles) { // to replace _renderAll()
  $('main').empty();
  $('main').append(
    articles.map(function(article) {
      return articlesView.renderSingle(article);
    })
  );
  $('#articles').fadeIn('slow').siblings().hide();
};

articlesView.renderSingle = function(article) {
  return articlesView.template(article);
};

articlesView.ui = function() {
  pageFunctions.closeNav();
  blog.viewFunctions();
};
