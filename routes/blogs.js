var express = require('express');
var router = express.Router();
var blogs = require('../public/sampleBlogs');
var blogPosts = blogs.blogPosts;



router.get('/', function(req, res, next) {
    
    res.json('This is for blogposts');
})

router.get('/all', function(req, res, next) { //***needs review to get desc command to work */
    const sortOrder = req.query.sort;
    blogPosts.sort((a, b) => {

        const aCreatedAt = a.CreatedAt
        const bCreatedAt = b.CreatedAt
        if (sortOrder === "asc") {
            if (aCreatedAt < bCreatedAt) {
                return -1;
            }
        }   if (aCreatedAt > bCreatedAt) {
                return 1;
        }
        if (sortOrder === "desc") {
            if (aCreatedAt > bCreatedAt) {
                return -1;
            }
            if (aCreatedAt < bCreatedAt) {
                return 1;
            }
        }
            return 0;


    })
    res.json(blogPosts.map(el=>el.createdAt));

})

router.get('/singleBlog/:blogId', function(req, res, next) {
    console.log(req.params);

    const blogId = req.params.blogId;
  
    res.json(findBlogId(blogId));
})

router.get('/postblog', function(req, res, next) {
    
    res.render('postblog');
})


//helper functions

const findBlogId = (blogId) => {
    const foundBlog = blogs.blogPosts.find(element => element.id === blogId);
    return foundBlog;
};

module.exports = router;