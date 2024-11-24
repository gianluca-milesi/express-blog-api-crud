const posts = require("../data/posts.js");

function tagFilter(req, res, next) {
    const tag = req.query.tag;
    if (tag) {
        const filteredPostsByTag = posts.filter((item) => item.tags.includes(tag));

        res.json({
            count: filteredPostsByTag.length,
            filteredPostsByTag
        })
        return;
    };

    next();
};

module.exports = tagFilter;