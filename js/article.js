var Article = function(props) {
  this.author = props.author;
  this.authorURL = props.authorURL;
  this.category = props.category;
  this.title = props.title;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
  blog.article.push(this);
};

// You're going to enter some jQuery/AJAX here
console.log
// For every cache hit or miss
// Only if there's a new article, should the page GET the content

Article.prototype.toHTML = function() {
  var source = $('#blogArticle').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  $('#app').append(html);

Article.getAll = function(callback) {
  webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
  callback
  );
};

Article.truncateTable =
// Incomplete

  // var age = this.postAge(this.publishedOn);
  // var $clonedArticle = $('article#post').clone();
  // $clonedArticle.removeAttr ('id');
  // $clonedArticle.find('.postAuthor').html ('<a href = "' + this.authorURL + '>' + this.author + '</a>');
  // $clonedArticle.find('.postTitle').html(this.title);
  // $clonedArticle.find('.postBody').html(this.body);
  // $clonedArticle.find('.postAge').html(this.publishedOn);
  // $clonedArticle.find('.postCategory').html(this.category);
  // $('main').append($clonedArticle);
};
//Anonymous callback function

Article.prototype.categorytagsDropDown = function() {
  var $clonedMenuItem1 = $('.categoryMenuItem').clone();
  $clonedMenuItem1.removeAttr('class');
  $clonedMenuItem1.attr('value', this.category);
  $clonedMenuItem1.text(this.category);
  if ($('#categoryFilter select').find('option[value="' + this.category + '"]').length === 0) {
    $('#categoryFilter select').append($clonedMenuItem1);
  };
};

Article.prototype.authortagsDropDown = function() {
  var $clonedMenuItem2 = $('.authorMenuItem').clone();
  $clonedMenuItem2.removeAttr('class');
  $clonedMenuItem2.attr('value', this.author);
  $clonedMenuItem2.text(this.author);
  if ($('#authorFilter select').find('option[value="' + this.author + '"]').length === 0) {
    $('#authorFilter select').append($clonedMenuItem2);
  };
};

Article.prototype.titletagsDropDown = function() {
  var $clonedMenuItem3 = $('.titleMenuItem').clone();
  $clonedMenuItem3.removeAttr('class');
  $clonedMenuItem3.attr('value', this.title);
  $clonedMenuItem3.text(this.title);
  if ($('#titleFilter select').find('option[value="' + this.title + '"]').length === 0) {
    $('#titleFilter select').append($clonedMenuItem3);
  };
};

Article.prototype.postAge = function(date) {
  var today = new Date();
  var dd = parseInt(today.getDate());
  var mm = parseInt(today.getMonth()+1);
  var yyyy = parseInt(today.getFullYear());

  var year = parseInt(date.slice(0,4));
  var month = parseInt(date.slice(5,7));
  var day = parseInt(date.slice(8,10));

  var oneDay = 24*60*60*1000; //Hours*Minutes*Seconds*Milliseconds
  var firstDate = new Date(year,month,day); //Publish date
  var secondDate = new Date(yyyy,mm,dd); //Today

  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  return diffDays;
};
// Will result in milliseconds
