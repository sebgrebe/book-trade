const addBook = require('../modules/addBook')
const deleteBook = require('../modules/deleteBook')
const getBooks = require('../modules/getBooks')
const tradeAction = require('../modules/tradeaction')
const getUsers = require('../modules/getusers')
const updateProfile = require('../modules/updateprofile')

module.exports = function(app,passport) {

  //Get books
  app.get('/api/getbooks',(req,res) => {
      getBooks((result) => {
        res.send(result)
      })
  })

  //Add book
  app.post('/api/addbook',(req,res) => {
    isLoggedIn(req,res, () => {
      addBook(req.body,(result) => {
        res.send(result)
      })
    })
  })

  //Delete book
  app.post('/api/deletebook',(req,res) => {
    isLoggedIn(req,res,() => {
      deleteBook(req.body,(result) => {
        res.send(result)
      })
    })
  })

  //Trade action
  app.post('/api/tradeaction',(req,res) => {
    isLoggedIn(req,res,() => {
      tradeAction(req.body,(result) => {
        res.send(result)
      })
    })
  })

  //Get users
  app.get('/api/getusers',(req,res) => {
    isLoggedIn(req,res, () => {
      getUsers((result) => {
        res.send(result)
      })
    })
  })

  //Update user profile
  app.post('/api/updateprofile',(req,res) => {
    isLoggedIn(req,res, () =>
      updateProfile(req.body, req.user._id, (result) => {
        res.send(result)
      })
    )
  })

  //Login
  app.post('/api/login', (req,res,cb) => {
    passport.authenticate('login',(err,user,info) => {
      if (err) return cb(err)
      if (!user) {
        return res.send({
            success: false,
            msg: info.msg
        })
      }
      req.logIn(user, function(err) {
        if (err) { res.send({ success : false, msg : 'login failed'}) }
        res.send({ success : true, msg : 'login succeeded', user: user});
      });
    })(req, res, cb);
  })

  //Signup
  app.post('/api/signup', (req,res,cb) => {
    passport.authenticate('signup',(err,user,info) => {
      if (err) return cb(err)
      if (!user) {
        return res.send({
            success: false,
            msg: info.msg
        })
      }
      req.logIn(user, function(err) {
        if (err) { res.send({ success : false, msg : 'Signup succeeded, but couldn\'t login'}) }
        res.send({ success : true, msg : 'Signup succeeded', user: user});
      });
    })(req, res, cb);
  })

  //Check whether user is authenticated
  app.get('/api/authenticated', (req,res) => {
    if (req.isAuthenticated()) {
      res.send({
        authenticated: true,
        user: req.user
      })
    }
    else {
      console.log('false')
      res.send({authenticated: false})
    }
})

  //Logout
  app.get('/api/logout', (req,res) => {
    isLoggedIn(req,res,() => {
      req.logout()
      res.send({
        success: true,
        message: 'Logged out successfully'
      })
    })
  })

  //Function that checks whether user is authenticated
  const isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't, send  message to client that user isn't
    res.send({success: false, msg: 'User is not authenticated'});
  }

}