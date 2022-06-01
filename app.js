//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect('mongodb+srv://admin-valiantlynx:valiantlynx@cluster0.lujhkmj.mongodb.net/dailyBlog');

let posts = [];

const homeStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const blogSchema = {
    name: String
};

const Blog = mongoose.model("Blog", blogSchema);

const home = new Blog({
    name: homeStartingContent
});

const about = new Blog({
    name: aboutContent
});

const contact = new Blog({
    name: contactContent
});

const defaultItems = [home, about, contact];

//home
app.get("/", function(req, res) {
    res.render("home", {
        homeContent: homeStartingContent,
        posts: posts
    });
});

//about
app.get("/about", function(req, res) {
    res.render("about", { aboutPageContent: aboutContent });
});

//contact
app.get("/contact", function(req, res) {
    res.render("contact", { contactPageContent: contactContent });
});

//compose
app.get("/compose", function(req, res) {
    res.render("compose");
});
app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        body: req.body.postText
    };
    posts.push(post);
    res.redirect("/");
});


//using route parameters
app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        if (requestedTitle === storedTitle) {
            res.render("post", {
                title: post.title,
                body: post.body
            });

        }
    });


});
app.post("/posts", function(req, res) {
    res.redirect("/posts");

})

//port listening
app.listen(3000, function() {
    console.log("Server started on port 3000");
});