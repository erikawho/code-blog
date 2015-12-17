var repoController = {};

repoController.index = function() {
  repo.loadAll(aboutView.index);
};
