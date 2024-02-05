import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3001;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let posts=[];

app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.post("/submit",(req,res)=>{
    const bodycontent= req.body.status;
    posts.push(bodycontent);
    res.render("posted.ejs", {post:posts})
}
)
app.get("/posts",(req,res)=>{
    res.render("posted.ejs", {post:posts});
})

app.listen(port,()=>{
    console.log("Running on port "+ (port))
})