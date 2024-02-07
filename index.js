import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const bodycontent = req.body.status;
    posts.push(bodycontent);
    res.redirect("/");

});
app.get("/home", (req,res) => {
    res.render("index.ejs");

})

app.get("/posts", (req, res) => {
    res.render("posted.ejs", { post: posts });
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    res.send(`<form action="/update/${index}" method="post">
                    <input type="text" name="updatedContent" value="${posts[index]}">
                    <button type="submit">Update</button>
                </form>`);
});

app.post("/update/:index", (req, res) => {
    const index = req.params.index;
    const updatedContent = req.body.updatedContent;
    posts[index] = updatedContent;
    res.render("posted.ejs", { post: posts });
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    posts.splice(index, 1);
    res.render("posted.ejs", { post: posts });
});

app.listen(port, () => {
    console.log("Running on port " + port);
});
