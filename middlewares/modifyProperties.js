const posts = require("../data/posts.js");

function modifyProperties(req, res, next) {
    const id = parseInt(req.params.id);
    const post = posts.find((item) => item.id === id);

    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const image = req.body.image;
    const tags = req.body.tags;

    if (title) {
        req.post.title = title;
    };
    if (slug) {
        req.post.slug = slug;
    };
    if (content) {
        req.post.content = content;
    };
    if (image) {
        req.post.image = image;
    };
    if (tags) {
        req.post.tags = tags;
    };

    req.post = post;
    next();
};

module.exports = modifyProperties;