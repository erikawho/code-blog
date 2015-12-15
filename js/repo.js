var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/brookr/repos' + '?sort=updated',
    headers: { Authorization: 'token ' }
  }).done(function(data) {
  $.getJSON('https://api.github.com/users/brookr/repos' + '?sort=updated');
};
