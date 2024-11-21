const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const postsRouter = require("./routers/posts.js");
app.use("/posts", postsRouter);

app.use(express.static("public"));



app.get('/', (req, res) => {
    res.send("Root");
});

app.listen(port, () => {
    console.log(`Server port: ${port}`);
});