
//We want to defer the implementation of the following code:
//The browser has the DOM ready. It has interpreted the HTML file, now onto the next thing.
$(document).ready(function() {
  blog.populate();
  blog.createAll();
  // $('#post').remove();
  blog.truncateArticle();
  newArticlePreview();
});
