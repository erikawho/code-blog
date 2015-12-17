var aboutView = {};

aboutView.index = function() {
  $('#author').prop('selectedIndex', 0);
  $('#title').prop('selectedIndex', 0);
  $('#repos').empty();
  $('#article').hide();
  $('#about').show();

  if (aboutView.template) {
    aboutView.filter(aboutView.renderRepos);
  } else {
    $.get('/html/repo.html', function(data, msg, xhr) {
      aboutView.template = Handlebars.compile(data);
      aboutView.filter(aboutView.renderRepos);
    });
  }
};

aboutView.renderRepos = function(repo) {
  repos.forEach(function(e) { // e represents the objects
    $('#repos').append(aboutView.toHTML(e));
  });
  aboutView.ui();
};

aboutView.filter = function(callback) {
  var filtered = repos.all.filter(function(repo) {
    return !repo.fork;
  });
  aboutView.renderRepos(filtered);
};

aboutView.toHTML = function(repo) {
  repo.name = repo.name.charAt(0).toUpperCase() + repo.name.slice(1);
  repo.created_at = repo.created_at.slice(0, 10);
  repo.updated_at = repo.updated_at.slice(0, 10);
  return aboutView.template(repo);
};

aboutView.showRepoDetails = function() {
  $('.repotemplate').on('click', function() {
    $(this).children().toggle();
  });
};

aboutView.ui = function() {
  this.showRepoDetails();
};
