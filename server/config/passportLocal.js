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
      User.findOne({ email }).select('+password_hash')
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              message: 'Invalid email or password !',
            });
          }
          user = user.toObject();
          delete user.password_hash;
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
  done(null, user);
  // User.findById(id).then((err, user) => {
  //   if (err) done(err);
  //   done(user);
  // });
});
