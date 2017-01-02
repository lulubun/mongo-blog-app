const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const BlogPost = require('./models/post');

mongoose.connect('mongodb://localhost:27017/blog-posts');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

const port = process.env.PORT || 8080;

const router = express.Router();

// log the http layer
//app.use(morgan('common'));

//app.use(express.static('public'));

router.get('/', (req, res) => {
  res.json({ message: 'Working!'});
});

// Create a new route with the prefix
const postsRoute = router.route('/blog-posts');

// Create endpoint for POSTS
postsRoute.post((req, res) => {
  const bPost = new BlogPost();

  // Set the post properties that came from the POST data
  bPost.title = req.body.title;
  bPost.content = req.body.content;
  bPost.author = req.body.author;
  bPost.created = req.body.created;

  // Save the post and check for errors
  bPost.save((err) => {
    if (err)
      res.send(err);

    res.json({ message: 'Blog Post Added', data: bPost });
  });
});

app.use('/blog-posts', router);


app.listen(port);
console.log(port);

module.exports = {app};

