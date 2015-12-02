var Article = function(props) {
  this.author = props.author;
  this.authorURL = props.authorURL;
  this.category = props.category;
  this.title = props.title;
  this.body = props.body;
  this.age = this.postAge(this.publishedOn);
  blog.articles.push(this);
};

Article.prototype.toHTML = function() {
  var age = this.postAge(this.publishedOn);
  var $clonedArticle = $('article#post').clone();
$clonedArticle.removeAttr ('id');
  $clonedArticle.find('h1.author').html ('<a href = "' + this.authorURL + '>' + this.author + '</a>');
  $clonedArticle.find('h2.title').html(this.title);
  $clonedArticle.find('div.post').html(this.body);
  $clonedArticle.find('h3.publishdate').html(this.publishedOn);
  $clonedArticle.find('h3.category').html(this.category);
  $('main').append($clonedArticle);
//Anonymous callback function

Article.prototype.tagsDropDown = function() {
  var $clonedMenuItem1 = $('.catMenuItem').clone();
  $clonedMenuItem1.removeAttr('class');
    $clonedMenuItem1.attr('value', this.category);
      $clonedMenuItem1.text(this.category);
      if ($"#catFilter select").find('option[value="' + this.category + '"]').length === 0) {
        $('#catFilter select').append($clonedMenuItem1);
      }

Article.prototype.tagsDropDown = function() {
  var $clonedMenuItem2 = $('.authMenuItem').clone();
  $clonedMenuItem2.removeAttr('class');
    $clonedMenuItem2.attr('value', this.author);
      $clonedMenuItem2.text(this.author);
      if ($"#authFilter select").find('option[value="' + this.author + '"]').length === 0) {
        $('#authFilter select').append($clonedMenuItem2);
            }
}

Article.prototype.postAge = function(date) {
   var today = new Date();
   var dd = parseInt(today.getDate());
   var mm = parseInt(today.getMonth()+1);
   var yyyy = parseInt(today.getFullYear());

   var year = parseInt(date.slice(0,4));
   var month = parseInt(date.slice(5,7));
   var day = parseInt(date.slice(8,10));

   var oneDay = 24*60*60*1000 //Hours*Minutes*Seconds*Milliseconds
   var firstDate = new Date(year,month,day); //Publish date
   var secondDate = new Date(yyyy,mm,dd); //Today

   var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
   return diffDays;
}
// Will result in milliseconds
