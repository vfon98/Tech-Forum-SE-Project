const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

passport.use(
  'fb-login',
  new FacebookStrategy(
    {
      clientID: '2559291467516498',
      clientSecret: '36dd97ec71bb829e7096430ecdbe24ed',
      callbackURL: 'http://localhost:9000/auth/facebook/callback',
      profileFields: [
        'id',
        'email',
        'displayName',
        'gender',
        'name',
        'location',
        'picture.type(large)',
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      const { id, email, name, gender, location, picture } = profile._json;
      // Create new user
      User.findOne({ email }).then(user => {
        // User has not created
        if (!user) {
          const fbUser = new User();
          fbUser.login_method = 'fb';
          fbUser.fbID = id;
          fbUser.email = email;
          fbUser.display_name = name;
          fbUser.avatar = picture.data.url;
          fbUser.gender = gender;
          fbUser.address = location ? location.name : '';
          fbUser
            .save()
            .then(() => {
              done(null, fbUser);
            })
            .catch(err => console.log(err));
        }
        // Existed user
        done(null, user)
        // done(null, user)
      }).catch(err => console.log(err));
      // done(null, profile._json);
    }
  )
);
