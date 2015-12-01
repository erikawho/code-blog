var Article = function(props) {
  this.author = props.author;
  this.authorURL = props.authorURL;
  this.category = props.category;
  this.title = props.title;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
};
Article.prototype.toHTML = function() {
  return '<article>' +
  '<h1>' + this.title + '</h1>' +
  '<a>' + this.author + '</a>' +
  '<a>' + this.authorURL + '</a>' +
  '<h3>' + this.category + '</h3>' +
  '<p>' + this.body + '</p>' +
  '<footer>' + this.publishedOn + '</footer>' +
    '</article>';
};

function (newArticle)
var $(Article.copy) = $('#template').clone
$('main').append(newArticle.toHTML());
console.log(newArticle.title)
