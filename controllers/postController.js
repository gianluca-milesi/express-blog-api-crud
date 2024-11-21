const posts = require("../data/posts.js");

//Index
function index(req, res) {
    // res.send("Elenco dei Posts");

    //Filtro per tags
    const tag = req.query.tag;
    if (tag) {
        const filteredPostsByTag = posts.filter((item) => item.tags.includes(tag));

        res.json(filteredPostsByTag)
        return;
    };

    //Filtro per limite
    const limit = req.query.limit;
    if (limit && (isNaN(limit) || limit <= 0)) {
        res.status(400);

        res.json({
            error: "Limit not a number",
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

    res.json({
        count: posts.length,
        allPosts: posts
    });
};

//Show
function show(req, res) {
    const param = req.params.id;
    // res.send(`Ecco il post con id o slug: ${param}`);
    const post = posts.find((item) => item.id === parseInt(param) || item.slug === param);

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
    // res.send("Creo un nuovo post");

    const { title, slug, content, image, tags } = req.body;

    const errors = validate(req);

    if (errors.length) {
        res.status(400);

        res.json({
            error: 'Invalid request',
            messages: errors,
        })
        return;
    };

    const post = {
        title,
        slug,
        content,
        image,
        tags
    };

    posts.push(post);
    res.status(201).send(post);
    console.log(posts);
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
    const param = req.params.id;
    // res.send(`Elimino il post con id o slug: ${param}`);
    const postIndex = posts.findIndex((item) => item.id === parseInt(param) || item.slug === param);

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




function validate(req) {
    const { title, slug, content, image, tags } = req.body;

    const errors = []

    if (!title) {
        errors.push("title is required")
    }

    if (!slug) {
        errors.push("slug is required")
    }

    if (!content) {
        errors.push("content is required")
    }

    if (!image) {
        errors.push("image is required")
    }

    if (!tags) {
        errors.push("tags is required")
    }

    return errors;
};