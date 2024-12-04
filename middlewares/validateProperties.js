const posts = require("../data/posts.js");

function validateProperties(req, res, next) {
    const id = parseInt(req.params.id);
    const post = posts.find((item) => item.id === id);

    const title = req.body.title;
    const image = req.body.image;
    const content = req.body.content;
    const tags = req.body.tags;
    const category = req.body.category;
    const published = req.body.published;

    const errors = []
    if (!title) {
        errors.push("title is required")
    };
    if (!image) {
        errors.push("image is required")
    };
    if (!content) {
        errors.push("content is required")
    };
    if (!tags) {
        errors.push("tags is required")
    };
    if (!category) {
        errors.push("category is required")
    };
    if (!published) {
        errors.push("published  is required")
    };
    if (errors.length) {
        res.status(400);

        res.json({
            error: "Invalid request",
            messages: errors,
        })
        return;
    };

    req.post = post;
    next();
};

module.exports = validateProperties;