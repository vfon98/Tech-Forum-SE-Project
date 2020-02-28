const mongoose = require('./config/database');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: 'covid-forum', resave: false, saveUninitialized: false })
);

require('./config/passportLocal');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/users', userRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Sever running on PORT ' + PORT);
});
