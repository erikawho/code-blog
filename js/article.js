var Article = function(props) {
  this.id = props.id;
  this.author = props.author;
  this.authorURL = props.authorURL;
  this.category = props.category;
  this.title = props.title;
  this.body = props.body;
  this.publishedOn = props.publishedOn;
  this.markdown = marked(props.markdown);
  this.age = 0;
  // blog.article.push(this);
};

// Only if there's a new article, should the page GET the content
// function Article (opts) {
//   Object.keys(opts).forEach(function(e, index, keys) {
//     this[e] = opts[e];
//   },this);
//
//   this.body = opts.body || marked(this.markdown);
// }

Article.allArticles = [];
Article.author = [];
Article.category = [];

Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown],
      }
    ],
    callback
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    [
      {
        'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, category = ?, publishedOn = ?, markdown = ? WHERE id = ?;',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown, this.id]
      }
    ],
    callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles WHERE id = ?;',
        'data': [this.id]
      }
    ],
    callback
  );
};

// Article.all = [];

Article.requestAll = function(next, callback) {
  $.getJSON('/js/blogArticles.json', function (data) {
    data.forEach(function(item) {
      var article = new Article(item);
      Article.allArticles.push(article);
      article.insertRecord();
    });
    callback();
  });
};

Article.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Article.all.length === 0) {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
      function(rows) {
        if (rows.length === 0) {
          // Request data from server, then try loading from db again:
          Article.requestAll(Article.loadAll, callback);
        } else {
          rows.forEach(function(row) {
            Article.all.push(new Article(row));
          });
          callback();
        }
      }
    );
  } else {
    callback();
  }
};

// Article.find = function(id, callback) {
//   webDB.execute(
//     [
//       {
//         'sql': 'SELECT * FROM articles WHERE id = ?',
//         'data': [id]
//       }
//     ],
//     callback
//   );
// };
//
// Article.prototype.toHTML = function() {
//   var source = $('#blogArticle').html();
//   var template = Handlebars.compile(source);
//   var html = template(this);
//   $('#app').append(html);
//
// Article.getAll = function(callback) {
//   webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
//   callback
//   );
// };
//
// Article.truncateTable = function(callback) {
//   webDB.execute('DELETE FROM articles;',
//     callback
//   );
// };

// Article.prototype.categorytagsDropDown = function() {
//   var $clonedMenuItem1 = $('.categoryMenuItem').clone();
//   $clonedMenuItem1.removeAttr('class');
//   $clonedMenuItem1.attr('value', this.category);
//   $clonedMenuItem1.text(this.category);
//   if ($('#categoryFilter select').find('option[value="' + this.category + '"]').length === 0) {
//     $('#categoryFilter select').append($clonedMenuItem1);
//   };
// };
//
// Article.prototype.authortagsDropDown = function() {
//   var $clonedMenuItem2 = $('.authorMenuItem').clone();
//   $clonedMenuItem2.removeAttr('class');
//   $clonedMenuItem2.attr('value', this.author);
//   $clonedMenuItem2.text(this.author);
//   if ($('#authorFilter select').find('option[value="' + this.author + '"]').length === 0) {
//     $('#authorFilter select').append($clonedMenuItem2);
//   };
// };
//
// Article.prototype.titletagsDropDown = function() {
//   var $clonedMenuItem3 = $('.titleMenuItem').clone();
//   $clonedMenuItem3.removeAttr('class');
//   $clonedMenuItem3.attr('value', this.title);
//   $clonedMenuItem3.text(this.title);
//   if ($('#titleFilter select').find('option[value="' + this.title + '"]').length === 0) {
//     $('#titleFilter select').append($clonedMenuItem3);
//   };
// };
//
// Article.prototype.postAge = function(date) {
//   var today = new Date();
//   var dd = parseInt(today.getDate());
//   var mm = parseInt(today.getMonth()+1);
//   var yyyy = parseInt(today.getFullYear());
//
//   var year = parseInt(date.slice(0,4));
//   var month = parseInt(date.slice(5,7));
//   var day = parseInt(date.slice(8,10));
//
//   var oneDay = 24*60*60*1000; //Hours*Minutes*Seconds*Milliseconds
//   var firstDate = new Date(year,month,day); //Publish date
//   var secondDate = new Date(yyyy,mm,dd); //Today
//
//   var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
//   return diffDays;
// };
// // Will result in milliseconds
