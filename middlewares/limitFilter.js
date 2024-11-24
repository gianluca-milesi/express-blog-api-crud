const posts = require("../data/posts.js");

function limitFilter(req, res, next) {
    const limit = req.query.limit;
    if (limit && (isNaN(limit) || limit <= 0)) {
        res.status(400);

        res.json({
            error: "Limit value is not a number",
            message: "Inserisci un numero valido"
        })
        return;
    } else if (limit) {
        const filteredPostsByLimit = posts.slice(0, limit);

        res.json({
            count: filteredPostsByLimit.length,
            filteredPostsByLimit
        })
        return;
    };

    next();
};

module.exports = limitFilter;