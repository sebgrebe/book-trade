var LocalStrategy = require('passport-local').Strategy
var User = require('../models/users')

module.exports = function(passport) {
  //Serialising and deserialising to restore authentication state across http requests
  passport.serializeUser(function(user, cb) {
      cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
      User.findById(id, function(err, user) {
          if (err) return cb(err)
          cb(null, user);
      });
  });

  //Login strategy
  passport.use('login', new LocalStrategy(
      function(username,password,cb) {
          User.findOne({'username': username}, (err,user) => {
              if (err) return cb(err)
              if (!user) return cb(null, false, {msg: 'User does not exist'})
              if (!user.validPassword(password)) return cb(null,false, {msg: 'Password incorrect'})
              return cb(null,user)
          })
      }
  ))

  //Signup strategy. passReqToCallback necessary to access req.body in callback function
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
    },
    function(req,username,password,cb) {
      User.findOne({'username': username}, function(err,user) {
        if (err) return cb(err)
        if (user) return cb(null,false, {msg: 'Username already taken'})
        else {
          var newUser = new User()
          newUser.username = username
          newUser.password = newUser.generateHash(password)
          newUser.email = req.body.email
          newUser.city = req.body.city
          newUser.country = req.body.country
          newUser.save(function(err) {
              if (err) return cb(null,false,{msg: err.message})
              return cb(null,newUser)
          })
        }
      })
    }
  ))
}

