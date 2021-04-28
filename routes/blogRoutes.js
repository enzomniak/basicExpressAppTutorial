const express = require("express");
const blogController = require("../controllers/blogContoller");

const router = express.Router();

//Blog routes
router.get("/", blogController.blog_index);

//Create blog page
router.get("/create", blogController.blog_create_get);

// Parameters //
//Blog POST
router.post("/", blogController.blog_create_post);

//Get single blog
router.get("/:id", blogController.blog_details);

//Handle a delete request
router.delete("/:id", blogController.blog_delete);

module.exports = router;

