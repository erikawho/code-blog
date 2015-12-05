

function newArticlePreview() {
  var $titleTemp = $('#article-title').val();
  var $bodyTemp = $('#article-body').val();
  var $authorTemp = $('#article-author').val();
  var $authorUrlTemp = $('#article-author-url').val();
  var $categoryTemp = $('#article-category').val();

  $('.postTitle').append($titleTemp);
  $('.postAuthor').append($authorTemp);
  $('.postCategory').append($categoryTemp);
  $('.postBody').append($bodyTemp);
  $('.postAge').append('Today');
};

$(document).ready(function(event) {
  event.preventDefault;
  $('#new-form').submit(newArticlePreview);
});
