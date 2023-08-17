const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const User = require('./models/user')
const mongoose = require('mongoose')

const cors = require('cors')

require('dotenv').config()
require('./database-connection')

const Middleware = require('./middleware')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const accountsRouter = require('./routes/accounts')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

// Call middleware expirationCheck
const middleware = new Middleware()
app.use(middleware.expirationCheck)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('trust proxy', 1)
const connectionPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

// Session
app.use(
  session({
    secret: "123456789'*-+",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
      //sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
    store: MongoStore.create({
      clientPromise: connectionPromise,
      stringify: false,
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({ url: req.url, date: new Date(), ip: req.ip })

  //console.log(req.session)

  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/accounts', accountsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
