const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  'fb-login',
  new FacebookStrategy(
    {
      clientID: '2559291467516498',
      clientSecret: '36dd97ec71bb829e7096430ecdbe24ed',
      callbackURL: 'http://localhost:9000/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);
