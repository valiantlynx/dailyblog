# Daily Blog Web Application README

## Overview
This project is a Daily Blog web application built using Node.js with Express, EJS, and MongoDB. It allows users to create, view, and read blog posts.

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running (either locally or through a MongoDB Atlas cluster)
- Basic knowledge of JavaScript and Node.js

## Key Features
- Home page displaying a list of blog posts
- About and Contact pages with static content
- Compose page for creating new blog posts
- Individual post pages accessible through dynamic URLs

## Installation and Setup
1. Clone the repository or download the source code.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Ensure MongoDB is running. Update the MongoDB connection string in the code if you're using a remote database.
4. Start the application using `node app.js` or `npm start` (if you set up a start script in `package.json`).
5. The application will be running on `http://localhost:3000`.

## Technologies Used
- **Express.js**: Web application framework for Node.js
- **EJS**: Templating language to generate HTML markup with JavaScript
- **MongoDB**: Database to store and retrieve blog posts
- **Mongoose**: MongoDB object modeling for Node.js
- **Body-Parser**: Middleware to parse incoming request bodies
- **Lodash**: Utility library for working with arrays, numbers, objects, strings, etc.

## Application Structure
- **Views**: EJS templates for rendering HTML (home, about, contact, compose, post)
- **Models**: Mongoose models to define schemas for blog and post data
- **Routes**: Express routes to handle requests (home, about, contact, compose, individual posts)

## Conclusion
This Daily Blog application showcases basic CRUD operations in a Node.js application with a MongoDB database. It's a great starting point for those looking to understand full-stack development with Node.js.

## Note
Before deploying this application in a production environment, consider implementing additional features like user authentication, input validation, and error handling.

### adding new projects with their own git history
```sh
git subtree add --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master --squash
git subtree pull --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master --squash
git subtree push --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master

```

