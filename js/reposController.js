var reposController = {};

reposController.index = function() {
  github.requestAll(aboutView.index);
};
