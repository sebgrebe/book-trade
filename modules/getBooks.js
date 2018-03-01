const Book = require('../models/books.js')

module.exports = (cb) => {
 Book.find({},(err,books) => {
   if (err) return cb({'success': false, 'msg': 'Couldn\'t get book list'})
   return cb({'success': true, books: books})
 })
}