const Book = require('../models/books')

module.exports = (obj,cb) => {
  const book = obj
  const trade = {
    owner: book['trade[owner]'],
    receiver: book['trade[receiver]'],
    status: book['trade[status]']
  }
  book.trade = trade
  Book.update(
    {"_id": book._id},
    book,
    (err) => {
      if (err) return cb({success: false, msg: 'Book entry couldn\'t be modified'})
      Book.find({},(err,books) => {
        if (err) return cb({success: false, msg: 'Book entry couldn\'t be modified'})
        return cb({success: true, books: books})
      })
    })
}