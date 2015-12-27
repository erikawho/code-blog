var aboutView = {};

aboutView.index = function() {
  aboutView.ui();

  var _append = function(data) {
    $('#repos').append(aboutView.render(data));
  };

  github.all.forEach(_append);
};

aboutView.render = function(repo) {
  return '<li>' + repo.full_name + '</li>';
};

aboutView.ui = function() {
  var $about = $('#about');
  var $ul = $about.find('ul');

  $ul.empty();
  $about.fadeIn().siblings().hide();
  blog.resetFilters();
  pageFunctions.closeNav();
};
