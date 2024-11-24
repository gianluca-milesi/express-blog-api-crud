const posts = require("../data/posts.js");

function statusError(req, res, next) {
    const param = req.params.id;
    const post = posts.find((item) => item.id === parseInt(param) || item.slug === param);

    if (!post) {
        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    }
    req.post = post; //salvo il post nella req
    next();  //Nel caso l'id esista, passa avanti (postController.show)
};

module.exports = statusError;