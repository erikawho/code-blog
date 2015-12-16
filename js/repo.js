var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/erikawho/repos' + '?sort=updated',
    headers: {Authorization: 'token ' + token}
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
  // $.getJSON('https://api.github.com/users/erikawho/repos' + '?sort=updated');
};
