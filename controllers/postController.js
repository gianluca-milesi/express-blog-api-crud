const posts = require("../data/posts.js");
let lastIndex = posts.at(-1).id;

//INDEX
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

    //Lettura dell'array di oggetti posts
    res.json({
        count: posts.length,
        allPosts: posts
    });
};


//SHOW
function show(req, res) {
    const param = req.params.id;
    // res.send(`Ecco il post con id o slug: ${param}`);
    const post = posts.find((item) => item.id === parseInt(param) || item.slug === param);

    //Gestione dell'errore sull'id
    if (!post) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    };

    //Lettura del singolo oggetto post
    res.json(post);
};


//STORE
function store(req, res) {
    // res.send("Creo un nuovo post");

    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const image = req.body.image;
    const tags = req.body.tags;

    //Gestione degli errori sulle proprietà
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
    if (errors.length > 0) {
        res.status(400);

        res.json({
            error: "Invalid request",
            messages: errors,
        })
        return;
    };

    //Creazione e aggiunta del nuovo oggetto post
    lastIndex++

    const post = {
        id: lastIndex,
        title, //title = title,
        slug,
        content,
        image,
        tags
    };

    // console.log(posts);
    posts.push(post);
    res.send(post);
    res.status(201);
};


//UPDATE
function update(req, res) {
    const id = parseInt(req.params.id);
    // res.send(`Aggiorno il post con id: ${id}`);
    const post = posts.find((item) => item.id === id);

    //Gestione dell'errore sull'id
    if (!post) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    };

    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const image = req.body.image;
    const tags = req.body.tags;

    //Gestione degli errori sulle proprietà
    const errors = []

    if (!title) {
        errors.push("title is required")
    };;
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

    //Aggiornamento dell'oggetto post
    post.title = title;
    post.slug = slug;
    post.content = content;
    post.image = image;
    post.tags = tags;

    // console.log(post);
    res.json(post);
    res.status(201);
};


//MODIFY
function modify(req, res) {
    const id = parseInt(req.params.id);
    // res.send(`Modifico il post con id: ${id}`);
    const post = posts.find((item) => item.id === id);

    //Gestione dell'errore sull'id
    if (!post) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    };

    //Modifica dell'oggetto post
    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const image = req.body.image;
    const tags = req.body.tags;

    if (title) {
        post.title = title;
    };
    if (slug) {
        post.slug = slug;
    };
    if (content) {
        post.content = content;
    };
    if (image) {
        post.image = image;
    };
    if (tags) {
        post.tags = tags;
    };

    res.json(post);
    res.status(201);
};


//DESTROY
function destroy(req, res) {
    const param = req.params.id;
    // res.send(`Elimino il post con id o slug: ${param}`);
    const postIndex = posts.findIndex((item) => item.id === parseInt(param) || item.slug === param);

    //Gestione dell'errore sul parametro (id e slug)
    if (postIndex === -1) {
        res.status(404);

        res.json({
            error: "Post not found",
            message: "Il post non è stato trovato"
        })
        return;
    };

    //Eliminazione dell'oggetto post
    posts.splice(postIndex, 1);
    // console.log(posts);
    res.status(204);
};

module.exports = { index, show, store, update, modify, destroy };






//Nuovo oggetto
/*
{
  "title": "Plumcake",
  "slug": "plumcake",
  "content": "Il plumcake è uno dei dolci più semplici e amati, perfetto per iniziare la giornata o accompagnare una pausa pomeridiana. Con pochi ingredienti come uova, zucchero, farina e yogurt, si ottiene una consistenza soffice e un sapore delicato. Basta un pizzico di lievito e magari qualche goccia di cioccolato o una grattugiata di limone per renderlo ancora più speciale. Ecco la nostra ricetta del plumcake, pensata per portare in tavola una bontà genuina e casalinga che piacerà a tutta la famiglia.",
  "image": "plumcake.webp",
  "tags": ["Dolci", "Colazione", "Ricette semplici", "Ricette al forno"]
}
*/