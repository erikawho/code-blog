var articleView = {};

// articleTemplate -> renderGroup -> render (one)
articleView.loadTemplate = function(article) {
  $.get('/html/handlebars.html', function(data, msg, xhr) {
    articleView.template = Handlebars.compile(data);
    articleView.authorPopulate();
    articleView.categoryPopulate();
    articleView.titlePopulate();
    articleView.handleFilter();
    articleView.renderGroup(article);
    articleView.truncateArticle();
  });
};

articleView.renderGroup = function(articleList) {
  $('#article') // HTML element 'article' ID in index.html
    .hide()
    .empty()
    .append(
      articleList.map(function(a) {
        return articleView.render(a);
      })
    )
    .siblings().hide();
};

articleView.index = function() {
  articleView.loadTemplate(Article.all);
};

articleView.render = function(article) {
  article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);

  article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
  article.authorSlug = util.slug(article.author);
  article.categorySlug = util.slug(article.category);
  $('#article').show();
  $('#about').hide();
  return articleView.template(article);
};

articleView.show = function(article) {
  articleView.loadTemplate(article);
};

// Expand/Collapse Article
articleView.truncateArticle = function() {
  $('article p:not(:first-child)').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};

// -----------FILTER DROPDOWN CONTENT----------------
// Author Filter
articleView.authorPopulate = function() {
  _.uniq(Article.all, function(article) {
    return article.author;
  }).map(function(article) {
    var $popAuthor = $('#author-filter').clone();
    $popAuthor.removeAttr('id').text(article.author);
    $('#author').append($popAuthor);
  });
};

// Category Filter
articleView.categoryPopulate = function() {
  _.uniq(Article.all, function(article) {
    return article.category;
  }).map(function(article) {
    var $popCategory = $('#category-filter').clone();
    $popCategory.removeAttr('id').text(article.category);
    $('#category').append($popCategory);
  });
};

// Title Filter
articleView.titlePopulate = function() {
  _.uniq(Article.all, function(article) {
    return article.title;
  }).map(function(article) {
    var $popCategory = $('#title-filter').clone();
    $popTitle.removeAttr('id').text(article.title);
    $('#title').append($popTitle);
  });
};

// -------------HANDLE THE FILTERS---------------------
articleView.handleFilter = function() {
  $('#category').on('change', (function() {
    page('/category/' + $(this).val());
});

  $('#author').on('change', (function() {
    page('/author/' + $(this).val();
});

  $('#title').on('change', (function() {
    page('/title/' + $(this).val();
  });
};
