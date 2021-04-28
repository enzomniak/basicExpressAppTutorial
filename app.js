const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//Creat an express app instance
const app = express();

//Connect mongoDB
const dbURI = "mongodb+srv://enzomniak:je4p9UlwbwD1zNpT@cluster0.rnly0.mongodb.net/node-tutorials?retryWrites=true&w=majority";

//This is async and it'll return a promise
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to DB")
        //Listen for request
        app.listen(3000);
    })
    .catch(err => console.log(err));

//Register view engine
app.set("view engine", "ejs");

//Static files and middleware
app.use(express.static("public")) //Folder name "public"
app.use(morgan("dev"));

//Main routes
//Render a view
app.get("/", (request, response) => {
    response.redirect("/blogs"); //Forword to the /blogs
});

//About page
app.get("/about", (request, response) => {
    response.render("about", { title: "About" });
});

//Redirect
app.get("/about-me", (request, resoponse) => {
    resoponse.render("about", { title: "About" });
});

//Blog routes
app.get("/blogs", (request, response) => {
    Blog.find().sort({createAt: -11}) //We can also sort by date
        .then(result => { //Remember this will return an object which is how the index.ejs render
            response.render("index", { title: "All Blogs", blogs: result })
        })
        .catch(err => {
            console.log(err);
        })
});

//Create blog page
app.get("/blogs/create", (request, response) => {
    response.render("create", { title: "Create" });
});

//404 page
app.use((request, response) => {
    response.status(404).render("404", { title: "Error" });
});

