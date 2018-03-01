const User = require('../models/users')

module.exports = (cb) => {
  User.find({},(err,users) => {
    if (err) return cb({success: false, msg: 'could not retrieve users'})
    return cb({success: true, users: users})
  })
}