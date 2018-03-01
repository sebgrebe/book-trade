const Book = require('../models/books.js')
const arrToStr = (arr) => {
  let new_str = ''
  for (var i=0; i < arr.length; i++) {
    if (i===0) {new_str += arr[i]}
    else {new_str = new_str + ', ' + arr[i]}
  }
  return new_str
}

module.exports = (obj,cb) => {
  const user_id = obj.user_id
  const newBook = new Book()
  const authors = typeof(obj['book[authors][]']) === 'object' ? arrToStr(obj['book[authors][]']) : obj['book[authors][]']
  newBook.title = obj['book[title]']
  newBook.authors = authors
  newBook.img = obj['book[img]']
  newBook.trade = {
    status: 'available',
    owner: user_id,
    receiver: ''
  }
  newBook.save((err) => {
    if (err) return cb({success: false, msg: 'Book couldn\'t be saved'})
    Book.find({},(err,books) => {
      if (err) return cb({success: false, msg: 'Book saved, but new list not returned'})
      return cb({success: true, book: books})
    })

  })
}