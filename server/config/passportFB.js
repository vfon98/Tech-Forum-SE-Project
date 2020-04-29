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
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: [
        'id',
        'email',
        'displayName',
        'gender',
        'name',
        'location',
        'picture.width(9999).height(9999)',
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
          // fbUser.avatar = picture.data.url;
          fbUser.avatar = `https://graph.facebook.com/${id}/picture?width=9999&height=9999`;
          fbUser.gender = gender;
          // If user deny location access
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
