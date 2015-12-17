var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    url: '/github/users/erikawho/repos' +
          '?per_page=100' +
          '?sort=updated',
    type: 'GET',
    success: function(data, message, xhr) {
      repos.all = data;
    }
  }).done(callback);
};
