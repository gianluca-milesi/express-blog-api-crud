const posts = require("../data/posts.js");

function validateProperties(req, res, next) {
    const id = parseInt(req.params.id);
    const post = posts.find((item) => item.id === id);

    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const image = req.body.image;
    const tags = req.body.tags;

    const errors = []
    if (!title) {
        errors.push("title is required")
    };
    if (!slug) {
        errors.push("slug is required")
    };
    if (!content) {
        errors.push("content is required")
    };
    if (!image) {
        errors.push("image is required")
    };
    if (!tags) {
        errors.push("tags is required")
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