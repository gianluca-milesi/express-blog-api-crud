const posts = require("../data/posts.js");

//Index
function index(req, res) {
    // res.send("Elenco dei Posts");
    if (req.query.tag) {
        const filteredPostByTag = posts.filter((item) => item.tags.includes(req.query.tag));
        
        res.json(filteredPostByTag)
        return;
    }

    res.json({
        count: posts.length,
        allPosts: posts
    });
};

//Show
function show(req, res) {
    const id = parseInt(req.params.id);
    // res.send(`Ecco il post con id: ${id}`);
    const post = posts.find((item) => item.id === id);

    if (!post) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    }

    res.json(post);
};

//Store
function store(req, res) {
    res.send("Creo un nuovo post");
};

//Update
function update(req, res) {
    const id = req.params.id;
    res.send(`Aggiorno il post con id: ${id}`);
};

//Modify
function modify(req, res) {
    const id = req.params.id;
    res.send(`Modifico il post con id: ${id}`);
};

//Destroy
function destroy(req, res) {
    const id = parseInt(req.params.id);
    // res.send(`Elimino il post con id: ${id}`);
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    };

    posts.splice(postIndex, 1);
    console.log(posts);
    res.status(204);
};

module.exports = { index, show, store, update, modify, destroy };