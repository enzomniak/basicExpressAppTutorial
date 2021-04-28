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
app.use(express.urlencoded({ extended: true })); //Used to takes all url encoded data and pass it so we can use
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
    Blog.find().sort({createdAt: -1}) //We can also sort by date
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

//Blog POST
app.post("/blogs", (request, response) => {
    const blog = new Blog(request.body); //Now we can pass the object that we logged to create a new blog
    //Save to the database
    blog.save()
        //Then we can foword to the main page to see all blogs
        .then(result => {
            response.redirect("/blogs");
        })
        .catch(err => {
            console.log(err);
        })
});

//Get single blog
app.get("/blogs/:id", (request, response) => {
    const id = request.params.id;
    Blog.findById(id)
        .then(result => {
            response.render("details", { blog: result, title: "Blog Details" });
        })
        .catch(err => {
            console.log(err);
        })
});

//Handle a delete request
app.delete("/blogs/:id", (requset, response) => {
    const id = requset.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            //if we do an ajax we can't render so we'll pass a JSON instead
            response.json({ redirect: "/blogs" }); //Here we send th JSON back to the browser for redirect later
        })
        .catch(err => {
            console.log(err);
        })
});

//404 page
app.use((request, response) => {
    response.status(404).render("404", { title: "Error" });
});