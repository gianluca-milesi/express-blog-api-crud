const express = require("express");
const app = express();
const port = 3000;

const notFound = require("./middlewares/notFound.js");

app.use(express.json());
app.use(express.static("public"));

const postsRouter = require("./routers/posts.js");
app.use("/posts", postsRouter);


app.get('/', (req, res) => {
    res.send("Root");
});

app.use(notFound);


app.listen(port, () => {
    console.log(`Server port: ${port}`);
});