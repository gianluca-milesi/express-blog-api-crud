const express = require("express");
const router = express.Router();
const posts = require("../data/posts.js");

//Index
router.get("/", (req, res) => {
    // res.send("Elenco dei Posts");

    res.json({
        count: posts.length,
        allPosts: posts
    });
});

//Show
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // res.send(`Ecco il post con id: ${id}`);
    const post = posts.find((item) => item.id === id);
    res.json(post);
});

//Store
router.post("/", (req, res) => {
    res.send("Creo un nuovo post");
});

//Update
router.put("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Aggiorno il post con id: ${id}`);
});

//Modify
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Modifico il post con id: ${id}`);
});

//Destroy
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Elimino il post con id: ${id}`);
});

module.exports = router;