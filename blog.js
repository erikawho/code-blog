var blog = {};
blog.articles = [];

blog.createAll = function() {
  this.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });

  for (var i = 0; i < this.rawData.length; i++) {
    var temp = new Article(this.rawData[i]);
    this.articles.push(temp);
    temp.tagsDropDown();
  }
};

blog.truncateArticles = function() {
  $('article.postBody p:not(:first-child)').hide();
  $('main').on('click', '.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('p:not(first-child)').show();
    $(this).hide();
  });
};

//We want to defer the implementation of the following code:
$(document).ready(function() {  //The browser has the DOM ready. It has interpreted the HTML file, now onto the next thing.
  blog.createAll();
  $('#post').remove();
  blog.truncateArticles();
});

$('select[id="category"]').change(function)){
   $('#author').find('option:first').attr('selected', 'selected');
   #('main').find('article').show();
   console.log($(this).val());

   if ($(this).val() !== 'none'){
     $('postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
   }
});

$('select[id="author"]').change(function)){
   $('#category').find('option:first').attr('selected', 'selected');
   #('main').find('article').show();
   console.log($(this).val());

   if ($(this).val() !== 'none'){
     $('article:not(:contains(' + $(this).val() + '))').hide();
   }
});

  //Selects the entire document. Passes in the document object.

  //Nav tabs
  blog.handleMainNav = function() {
     $('.main.-nav').on('click'. '.tab', function(e) {
       $(.tab-content').hide();
       $('#' + $(this).data('content')).fadeIn();
     });
     $('main-nav' .tab:first').trigger('click');

     }
