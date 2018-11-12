const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true}
});

//based on the schema, we need to create a model and export it in order to use it throughout our app
module.exports = mongoose.model('Post', postSchema);
