//Convention name format is "something_page_method"
const Blog = require("../models/blog");

const blog_index = (request, response) => {
    Blog.find().sort({createdAt: -1})
        .then(result => { 
            response.render("blogs/index", { title: "All Blogs", blogs: result });
        })
        .catch(err => {
            console.log(err);
        })
};

const blog_details = (request, response) => {
    const id = request.params.id;
    Blog.findById(id)
        .then(result => {
            response.render("blogs/details", { blog: result, title: "Blog Details" });
        })
        .catch(err => {
            console.log(err);
        })
};

const blog_create_get = (request, response) => {
    response.render("blogs/create", { title: "Create" });
};

const blog_create_post = (request, response) => {
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
};

const blog_delete = (request, response) => {
    const id = request.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            //if we do an ajax we can't render so we'll pass a JSON instead
            response.json({ redirect: "/blogs" }); //Here we send th JSON back to the browser for redirect later
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};

