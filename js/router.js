page('/',
    articlesController.loadDB,
    articlesController.getTemplate,
    articlesController.index,
    articlesController.show
);
page('/category/:category',
    articlesController.getTemplate,
    articlesController.category,
    articlesController.show
);
page('/author/:author',
    articlesController.getTemplate,
    articlesController.author,
    articlesController.show
);
// page('/title/:title',
//     articlesController.getTemplate,
//     articlesController.title,
//     articlesController.show
// );
page('/about', aboutController.index);

page.start();
