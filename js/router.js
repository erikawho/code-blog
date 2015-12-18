page('/', articleController.index);

page('/category/:category',
    articleController.category,
    articleController.show
);

page('/author/:author',
    articleController.author,
    articleController.show
);

page('/title/:title',
    articleController.author,
    articleController.show
);

page('/html/about', repoController.index);

page.start();
