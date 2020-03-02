require('./config/database');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'CovidForum',
    resave: false,
    saveUninitialized: false,
    cookie: {
      // httpOnly: false,
      // secure: null,
      // sameSite: 'none',
      httpOnly: false,
      maxAge: 1000 * 60 * 24 * 7, // 7 days
    },
  })
);

require('./config/passportFB');
require('./config/passportLocal');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // res.header('Accept', 'application/json',);
  // res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
app.use('/users', userRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Sever running on PORT ' + PORT);
});
