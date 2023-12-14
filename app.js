//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

//mongoose.connect('mongodb+srv://admin-valiantlynx:valiantlynx@cluster0.lujhkmj.mongodb.net/dailyBlog');
mongoose.connect('mongodb://localhost:27017/dailyBlog');

const homeStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//default content for home, about, contact
const blogSchema = {
    name: String,
    blog: String
};

const Blog = mongoose.model("Blog", blogSchema);

const home = new Blog({
    name: "Home",
    blog: homeStartingContent
});

const about = new Blog({
    name: "About Us",
    blog: aboutContent
});

const contact = new Blog({
    name: "Contact Us",
    blog: contactContent
});

//content posts

const listSchema = {
    title: String,
    body: String
}

const Post = mongoose.model("Post", listSchema);

//home
app.get("/", function(req, res) {


    Post.find({}, function(err, posts) {
        res.render("home", {
            homeTitle: home.name,
            homeContent: home.blog,
            posts: posts
        });

    });


});


//about
app.get("/about", function(req, res) {

    res.render("about", {
        aboutTitle: about.name,
        aboutPageContent: about.blog
    });

});

//contact
app.get("/contact", function(req, res) {
    res.render("contact", {
        contactTitle: contact.name,
        contactPageContent: contact.blog
    });
});


//compose
app.get("/compose", function(req, res) {

    res.render("compose");
});

app.post("/compose", function(req, res) {

    const post = new Post({
        title: req.body.postTitle,
        body: req.body.postText,
    });

    post.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    });
});


//using route parameters
app.get("/posts/:postId", function(req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId }, function(err, post) {
        res.render("post", {
            title: post.title,
            body: post.body
        });
    });
    //res.redirect("/");
});

app.post("/posts", function(req, res) {
    res.redirect("/posts");
});



//port listening
app.listen(3000, function() {
    console.log("Server started on port 3000");
});