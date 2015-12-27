var github = {};

github.all = [];

github.requestAll = function(callback) {
  $.ajax({
    url: '/github/users/erikawho/repos?sort=updated',
    type: 'GET',

    success: function(data, message, xhr) {
      github.all = data;
    }
  }).done(callback);
};
