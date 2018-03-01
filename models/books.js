var mongoose = require('mongoose');

// define the schema for our users model
var bookSchema = mongoose.Schema({
    'title': String,
    'authors': String,
    'img': String,
    'trade': {
      'status': String,
      'owner': String,
      'receiver': String
    }
});

module.exports = mongoose.model('Book', bookSchema);