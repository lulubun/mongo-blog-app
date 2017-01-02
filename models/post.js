// Load required packages
var mongoose = require('mongoose');

// Define our schema
var PostSchema   = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    created: String
});

// Export the Mongoose model
module.exports = mongoose.model('Post', PostSchema);