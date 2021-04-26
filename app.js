const express = require("express");
const morgan = require("morgan");

//Creat an express app instance
const app = express();

//Register view engine
app.set("view engine", "ejs");

//Listen for request
app.listen(3000);

//Static files and middleware
app.use(express.static("public")) //Folder name "public"
app.use(morgan("dev"));

//Render a view
app.get("/", (request, response) => {
    const blogs = [
        { title: "Marry Poppin", snippet: "Marry go' round popin' them bitches~" },
        { title: "Star star", snippet: "Twinkle twinkle somethin' somethin'" },
        { title: "I dun no", snippet: "watever watever bla bla bla.." }
    ];
    response.render("index", { title: "Home", blogs }); //Now we can pass in some blogs
});

//About page
app.get("/about", (request, response) => {
    response.render("about", { title: "About" });
});

//Redirect
app.get("/about-me", (request, resoponse) => {
    resoponse.render("about", { title: "About" });
});

//Create blog page
app.get("/blogs/create", (request, response) => {
    response.render("create", { title: "Create" });
});

//404 page
app.use((request, response) => {
    response.status(404).render("404", { title: "Error" });
});

