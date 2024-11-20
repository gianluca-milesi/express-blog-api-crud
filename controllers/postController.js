const posts = require("../data/posts.js");

//Index
function index(req, res) {
    // res.send("Elenco dei Posts");
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
    const id = req.params.id;
    res.send(`Elimino il post con id: ${id}`);
};

module.exports = { index, show, store, update, modify, destroy };