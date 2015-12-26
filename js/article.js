// constructor
var Article = function(props) {
  this.id = props.id;
  this.title = props.title;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.category = props.category;
  this.markdown = props.markdown;
  this.markedBody = marked(this.markdown);
  this.publishedOn = props.publishedOn;
  this.calculateDaysOld();
};

// date method
Article.prototype.calculateDaysOld = function() {
  var currentDate = new Date();
  var publishedDate = new Date(this.publishedOn);
  var diffDays = Math.floor((currentDate.getTime() - publishedDate.getTime())/1000/60/60/24);
  this.daysOld = diffDays;
};

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

Article.all = [];

// Populate database from json
Article.requestAll = function(next, callback) {
  $.getJSON('/js/blogArticles.json', function (articles) {
    console.log(articles + 'Articles from line 52')
    articles.forEach(function(articleData) {
      var article = new Article(articleData);
      console.log(article)
      article.insertRecord();
    });
    next(callback);
  });
};

Article.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Article.all.length === 0) {
    console.log('Article length 0');
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
      function(rows) {
        if (rows.length === 0) {
          console.log('Row length 0');
          // Request data from server, then try loading from db again:
          Article.requestAll(Article.loadAll, callback);
        } else {
          rows.forEach(function(row) {
            Article.all.push(new Article(row));
            console.log('Created new article');
          });
          callback();
        }
      }
    );
  } else {
    callback();
  }
};

Article.find = function(id, callback) {
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE id = ?',
        'data': [id]
      }
    ],
    callback
  );
};

Article.findByCategory = function(category, callback) {
  webDB.execute(    // Gets the array and passes it to the callback
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?',
        'data': [category]
      }
    ],
    function(rows) {
      var articles = rows.map(function(row) {
        return new Article(row);
      });
      callback(articles);
    }
  );
};

Article.findByAuthor = function(category, callback) {
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?',
        'data': [author]
      }
    ],
      callback
    // function(rows) {
    //   var articles = rows.map(function(row) {
    //     return new Article(row);
    //   });
    //   callback(articles);
    // }
  );
};

Article.findByTitle = function(category, callback) {
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?',
        'data': [title]
      }
    ],
    callback
    // function(rows) {
    //   var articles = rows.map(function(row) {
    //     return new Article(row);
    //   });
    //   callback(articles);
// }
  );
};

Article.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute('DELETE FROM articles;',
    callback
  );
};
