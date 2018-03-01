const User = require('../models/users')

module.exports = (data,user_id,cb) => {
  const handleError = () => {
    return cb({success: false, msg: 'Profile couldn\'t be modified'})
  }
  const chooseUpdate = () => {
    switch(data.property) {
      case 'Username':
        return {'username': data.content}
      case 'Email':
        return {'email': data.content}
      case 'City':
        return {'city': data.content}
      case 'Country':
        return {'country': data.content}
    }
  }
  let update = chooseUpdate()
  const updateProperty = () => {
    User.update(
      {"_id": user_id},
      update,
      (err) => {
        if (err) {handleError()}
        User.find(
          {"_id": user_id},
          (err,user) => {
            if (err) {handleError()}
            return cb({success: true, msg: 'Profile was updated', user: user})
          })

      }
    )
  }
  if (data.property === 'Username') {
    User.find(
      {'username': data.content},
      (err,user) => {
        if (err) {handleError()}
        if (user.length > 0) return cb({success: false, msg: 'Username already taken'})
        updateProperty()
      }
    )
  }
  else if (data.property === 'Email') {
    User.find(
      {'email': data.content},
      (err,user) => {
        if (err) {handleError()}
        if (user.length > 0) return cb({success: false, msg: 'Email already used'})
        updateProperty()
      }
    )
  }
  else {updateProperty()}
}