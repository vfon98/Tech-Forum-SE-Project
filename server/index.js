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

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'covid forum',
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      domain: 'localhost',
      maxAge: 60 * 1000, // One hour
    },
  })
);

require('./config/passportFB');
require('./config/passportLocal');
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
app.use('/users', userRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Sever running on PORT ' + PORT);
});
