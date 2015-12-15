var stats = {};
stats.uniqueAuthors = [];
stats.markdownWordCounts = [];
stats.allWordsArray = [];
stats.eachAuthorWords = [];

stats.getAllArticles = function(rawJSON) {
  stats.allArticles = rawJSON;
};

stats.numOfArticles = function() {
  var articleCount = stats.allArticles.length;
  $('main').append('<p>Number of Articles: ' + articleCount + '</p>');
};

stats.wordCount = function(str) {
  return str.replace(/[#,\n]/g,'').match(/\b\w+/g);
};

stats.totalWordCount = function() {
  var allWords = function(art) {
    stats.markdownWordCounts.push(stats.wordCount(art.markdown).length);
  };
    stats.allArticles.map(allWords);
    stats.blogWordCount = stats.markdownWordCounts.reduce(getSum, 0);
    $('main').append('<p>Number of Words in All Articles: ' + stats.blogWordCount);

stats.numberOfAuthorWords


stats.allWordLengths = function() {

}
}

stats.searchAuthors = function() {
  // Search through array and if author is not there, add author to the article
  var getAuthors = function(art) {
    if ($.inArray(art.author, stats.uniqueAuthors) === -1) { // === "Equal value and equal type"
      stats.uniqueAuthors.push(art.author);
    }
  };
  stats.allArticles.map(getAuthors);
  // Map creates a new array with the same number of elements. Transformation of something that's in the original array. Modifying something that's available to the closure. What is the array going to look like that's returned to the map function? Array of undefined.
};

stats.numOfAuthors = function() {
  var authorCount = stats.uniqueAuthors.length;
  $('main').append('<p>Number of Articles: ' + authorCount + '</p>');
};

stats.numberOfAuthorWords = function() {
  stats.uniqueAuthors.forEach(function(element, index, array) {
    var countTemp = 0;
    var getAuthorWords = function(art) {
      if (art.author === element) {
        countTemp += stats.wordCount(art.markdown).length;
      };
    };
    stats.allArticles.forEach(getAuthorWords);
    stats.eachAuthorWords.push(countTemp);
});
stats.uniqueAuthors.forEach(function(element, index, array) {
  $('main').append('<p>Number of Words ' + element + ' has written: '</p>');
});
};

$(function() {
  $.get('util/articles.json', stats.getAllArticles)
  .done(stats.numOfArticles)
  .done(stats.searchAuthors)
  .done(stats.numOfAuthors)
  .done(stats.totalWordCount)
  .done(stats.allWordLengths)
  .done(stats.numberOfAuthorWords)

  ;
});

stats.wordCount = function(str) {
  return str.replace(/[#,\n]/g,'').match(/\b\w+/g);
};
