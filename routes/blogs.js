var express = require('express');
var router = express.Router();
var blogs = require('../public/sampleBlogs');
var blogPosts = blogs.blogPosts;

const {blogsDB} = require("../mongo");

router.get("/", async function (req, res, next) {
    const collection = await blogsDB().collection("fiftyblogs");
    const fiftyBlogs = await collection.find({}).toArray();
    // console.log(fiftyBlogs);
    res.json(fiftyBlogs);
  })

router.get('/all', async function(req, res, next) { 
    try{
    let sortField=req.query.sortField;
    let sortOrder = req.query.sortOrder;
        if(sortField=== "asc"){
            sortOrder =1
        }
        else if (sortField === "desc"){
            sortOrder = -1
        }
        const collection = await blogsDB().collection("fiftyblogs")
        const fiftyBlogs = await collection.find({}).sort({
            createdAt: sortField //sorts by date created
        }).toArray();
        res.json(fiftyBlogs);
    }catch (e){
        res.status(500).send("Error obtaining blog posts" + e)
    }
})

router.get('/singleBlog/:blogId', async function(req, res, next) {
    try{

    const blogId = Number(req.params.blogId);
    const collection = await blogsDB().collection("fiftyblogs");
    const foundIt = await collection.findOne({id: blogId});
    res.json(foundIt);
    }

    catch (e){
    res.status(500).send("Error obtaining blog posts" + e)
    }
    })

router.get('/postblog', function(req, res, next) {
    
    res.render('postblog');
})

router.get('/displayBlogs', function(req, res){
    
    res.render('displayBlogs')
})

router.post('/submit', async function (req, res, next){
    try{
        const collection = await blogsDB().collection("fiftyblogs");
        const blogArray = await collection.find({}).sort({ id: 1}).toArray();
        const lastBlog = blogArray[blogArray.length-1]

     let newBlog ={
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        createdAt: new Date(),
        id: Number(lastBlog.id + 1)
    }
    await collection.insertOne(newBlog);
    res.status(200).send("Blog Submitted.")
}catch (e) {

    res.status(500).send("Error fetching posts" + e);
}
})

router.get('/displaysingleblog', function(req, res, next){
    res.render('displaysingleblog')
})


router.delete('/deleteBlog/:blogId', async function (req,res,next){
   try{
    const blogId = Number(req.params.blogId);
    const collection = await blogsDB().collection("fiftyblogs");
    const blogDelete = await collection.findOne({id: blogId});
        await collection.deleteOne({id:blogId});

        res.status(200).send("Blog Post deleted.")
   }
    catch (error) {
        res.status(500).send("Error deleting blog."+ error)
    }
})

router.put('/update-blog/:blogId', async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("fiftyblogs");
        const blogId = Number(req.params.blogId);
        const thisBlog = await collection.findOne({ id: blogId});
        if (!thisBlog){
            res.send('Blog Id: ' + blogId + "doesn't exist!")
            console.log("doesn't exist!")
        }else{
        let updateBlog = req.body;
        
        const blogTitle = updateBlog.title ? updateBlog.title : thisBlog.title;
        const blogText = updateBlog.text ? updateBlog.text : thisBlog.text;
        const blogAuthor = updateBlog.author ? updateBlog.author : thisBlog.author;
        const blogCategory = updateBlog.category ? updateBlog.category : thisBlog.category;

        updateBlog = {
            lastModified: new Date(),
            title: blogTitle,
            text: blogText,
            author: blogAuthor,
            category: blogCategory,
        };
        await collection.updateOne({
            id: blogId}, 
        {$set: updateBlog});
        res.status(200).send('Updated Blog Id: ' + blogId);
        }
    } catch (error) {
        res.status(500).send("Error updating blog." + error)
    }
})

module.exports = router;







//helper functions

const findBlogId = (blogId) => {
    const foundBlog = blogs.blogPosts.find(element => element.id === blogId);
    return foundBlog;
};

// let sortBlogs = (order) => { <---------not being used anymore 
//     if (order === 'asc') {
//         return blogPosts.sort(function (a, b) {
//             return new Date(a.createdAt) - new Date(b.createdAt)
//         })
//     } else if (order === 'desc') {
//         return blogPosts.sort(function (a, b) {
//             return new Date(b.createdAt) - new Date(a.createdAt)
//         });
//     } else {
//         return blogPosts;
//     }
// };

