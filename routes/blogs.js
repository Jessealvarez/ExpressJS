var express = require('express');
var router = express.Router();
var blogs = require('../public/sampleBlogs');
var blogPosts = blogs.blogPosts;



router.get('/', function(req, res, next) {
    
    res.json(blogPosts);
})

router.get('/all', function(req, res, next) { //***needs review to get desc command to work */
    const sortOrder = req.query.sort;

    res.json(sortBlogs(sortOrder));
    
   

})

router.get('/singleBlog/:blogId', function(req, res, next) {
    console.log(req.params);

    const blogId = req.params.blogId;
  
    res.json(findBlogId(blogId));
})

router.get('/postblog', function(req, res, next) {
    
    res.render('postblog');
})

router.get('/displayBlogs', function(req, res){
    res.render('displayBlogs')
})
//* Create a new GET route /blogs/displayBlogs that will render the displayBlogs 
//page to the browser. Test that the basic functionality of the page is working by 
//clicking the Get Blogs button, your various blog titles should appear in a list. 
//Test that your postBlog page is still working by adding a new blog then go back 
//to displayBlogs and click Get Blogs again. Your new blog title should appear on the page.

router.post('/submit', function (req, res, next){
    const newBlog ={
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        createdAt: Date.parse(new Date()),
        id: String(blogPosts.length + 1)
    }
    blogPosts.push(newBlog)
    console.log("test to see if this worked:", blogs.blogPosts)

    res.send("OK");
})
//helper functions

const findBlogId = (blogId) => {
    const foundBlog = blogs.blogPosts.find(element => element.id === blogId);
    return foundBlog;
};

let sortBlogs = (order) => {
    if (order === 'asc') {
        return blogPosts.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
    } else if (order === 'desc') {
        return blogPosts.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt)
        });
    } else {
        return blogPosts;
    }
};

module.exports = router;