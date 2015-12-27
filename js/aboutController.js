var aboutController = {};

aboutController.index = function() {
  github.requestAll(aboutView.index);
};
