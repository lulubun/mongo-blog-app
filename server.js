const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {BlogPost} = require('./models/post');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


router.get('/posts', (req, res) => {
  BlogPost
    .find()
    .exec()
    .then(posts => {
      res.json(posts.map(post => post.apiRepr()));
    });
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.get('/posts/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .exec()
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal server error'});
    });
});

// Create endpoint for POSTS
router.post('/posts', (req, res) => {
  const bPost = new BlogPost();
  // Set the post properties that came from the POST data
  bPost.title = req.body.title;
  bPost.content = req.body.content;
  bPost.author = req.body.author;
  bPost.created = req.body.created;

  // Save the post and check for errors
  bPost.save((err) => {
    if (err)
      res.status(400).json({
        error: 'Missing "${field}" in request body'
      });

    res.json({ message: 'Blog Post Added', data: bPost });
  })
  .then(blogPost => res.status(201).json(blogPost.apiRepr()))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'Something went wrong'});
  });
});





app.use(router);


app.listen(port);
console.log(port);

module.exports = {app};

