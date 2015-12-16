var repoController = {};

repoController.index = function() {
  repo.loadAll(repoView.index);
};
