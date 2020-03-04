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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'CovidForum',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 3600 * 24 * 7, // 7 days
    },
  })
);

// Passport config
require('./config/passportFB');
require('./config/passportLocal');
app.use(passport.initialize());
app.use(passport.session());

const Room = require('./models/Room');
app.post('/room/create', (req, res) => {
  const room = new Room();
  room.name = req.body.name;
  room.save().then(result => res.json(result));
})

// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   next();
// });

// Route config
app.use(require('./routes'));

// Server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Sever running on PORT ' + PORT);
});
