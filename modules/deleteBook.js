const User = require('../models/users.js')
const Book = require('../models/books.js')

module.exports = (obj,cb) => {
  const book_id = obj.book_id
  Book.remove({'_id': book_id},(err) => {
    if (err) return cb({success: false, msg: 'Book couldn\'t be deleted.'})
    Book.find({},(err,books) => {
      if (err) return cb({success: false, msg: 'Book deleted, but new list not returned.'})
      return cb({success: true, books: books})
    })
  })
}