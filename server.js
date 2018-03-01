//package dependencies
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const port = process.env.PORT || 8080;

const path = require('path')

const app = express();

//connect to database and load passport strategies
const db_url = (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL;
mongoose.connect(db_url)
require('./auth/passport')(passport)

//set up express app
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//configure passport
app.use(session({
  secret: 'hack78My!',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session({
  secret: 'hack78My!',
  resave: true,
  proxy: true,
  saveUninitialized: true
}))

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(cors({credentials: true, origin: true}))

app.use(express.static('public/images'));

app.use('/frontend/dist',express.static(path.join(__dirname, 'frontend/dist')))

// load routes and pass in app and fully configured passport
require('./routes/routes.js')(app,passport);

//configuring server to handle real URLs. See https://github.com/ReactTraining/react-router/blob/v3/docs/guides/Histories.md#browserhistory
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend/dist', 'index.html'))
// })

app.listen(port, () => console.log(`listening on ${ port }`))

