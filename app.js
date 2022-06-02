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
    name: String,
    items: [blogSchema]
}

const Post = mongoose.model("Post", listSchema);
let posts = [];

//home
app.get("/", function(req, res) {

    Blog.find({ name: "Home" }, function(err, foundItem) {
        if (foundItem.length === 0) {
            Blog.insertMany(home, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully inserted home home into collection");
                }
            });
            res.redirect("/");

        } else {
            console.log(posts);
            res.render("home", {
                homeTitle: foundItem[0].name,
                homeContent: foundItem[0].blog,
                posts: posts
            });
        }
    });
});


//about
app.get("/about", function(req, res) {
    Blog.find({ name: "About Us" }, function(err, foundItem) {
        if (foundItem.length === 0) {
            Blog.insertMany(about, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully inserted about about into collection");
                }
            });
            res.redirect("/");

        } else {
            res.render("about", {
                aboutTitle: foundItem[0].name,
                aboutPageContent: foundItem[0].blog
            });
        }
    });
});

//contact
app.get("/contact", function(req, res) {
    Blog.find({ name: "Contact Us" }, function(err, foundItem) {
        if (foundItem.length === 0) {
            Blog.insertMany(contact, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully inserted contact contact into collection");
                }
            });
            res.redirect("/");

        } else {
            res.render("contact", {
                contactTitle: foundItem[0].name,
                contactPageContent: foundItem[0].blog
            });
        }
    });
});

//compose
app.get("/compose", function(req, res) {

    res.render("compose");
});

app.post("/compose", function(req, res) {
    let title = req.body.postTitle
    let body = req.body.postText

    const post = {
        title: title,
        body: body
    };

    console.log(post);
    Blog.insertMany(post, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully inserted contact contact into collection");
        }
    });
    posts.push(post);
    res.redirect("/");
});


//using route parameters
app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    Blog.find({ name: requestedTitle }, function(err, foundItem) {
        console.log(foundItem);

        res.render("post", {
            title: foundItem.name,
            body: foundItem.blog,
        });

    });
});

app.post("/posts", function(req, res) {

    res.redirect("/posts");

})

//port listening
app.listen(3000, function() {
    console.log("Server started on port 3000");
});