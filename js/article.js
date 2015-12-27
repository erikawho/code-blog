// constructor
var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = props.publishedOn;
  this.markdown = props.markdown;
  this.daysAgo = Math.ceil((new Date() - new Date(props.publishedOn)) / 1000 / 60 / 60 / 24);
};

Article.prototype.insertIntoDB = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, marked(this.markdown)]
      }
    ]
  , callback);
};

Article.prototype.updateDB = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, category = ?, publishedOn = ?, markdown = ? WHERE id = ?;',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, marked(this.markdown), this.id]
      }
    ]
  , callback);
};

Article.prototype.deleteFromDB = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles WHERE id = ?;',
        'data': [this.id]
      }
    ]
  , callback);
};

// ------------- METHODS ----------------

Article.findAll = function(callback) {
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC'
    , callback);
};

Article.find = function(id, callback) {
  webDB.execute(
    [
      {
        sql: 'SELECT * FROM articles WHERE id = ?',
        'data': [id]
      }
    ]
  , callback);
};

Article.findByAuthor = function(author, callback) {
  webDB.execute(
    [
      {
        sql: 'SELECT * FROM articles WHERE author = ?',
        'data': [author]
      }
    ]
  , callback);
};

Article.findByCategory = function(category, callback) {
  webDB.execute(
    [
      {
        sql: 'SELECT * FROM articles WHERE category = ?',
        'data': [category]
      }
    ]
  , callback);
};
// 
// Article.findByTitle = function(title, callback) {
//   webDB.execute(
//     [
//       {
//         sql: 'SELECT * FROM articles WHERE title = ?',
//         'data': [title]
//       }
//     ]
//   , callback);
// };

Article.insert = function(ele) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, marked(ele.markdown)]
      }
    ]
  );
};
