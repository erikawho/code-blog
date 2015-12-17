page('/', articleController.index);
page('/category/:category',
    articleController.category,
    articleController.show
);

page('title/:title', articleController.title);
articleController.title,
articleController.show;

page('author/:author', articleController.author);
page('/html/about', repoController.index);

page.start();
