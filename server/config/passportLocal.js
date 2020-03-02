let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../models/User');

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(email, password, done) {
      User.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              message: 'Invalid email or password !',
            });
          }
          console.log('FROM LOCAL successful');
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("-- LOCAL DESERIALIZED")
  done(null, user);
  // User.findById(id).then((err, user) => {
  //   if (err) done(err);
  //   done(user);
  // });
});
