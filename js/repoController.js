var repoController = {};

repoController.index = function() {
  repos.loadAll(repoView.index);
};
