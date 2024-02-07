const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const UserModel = require("./models/user");

const CLIENT_ID = "583283669192-6bavcul10ofg1hcssvis6mijiq9k39kf.apps.googleusercontent.com"
const CLIENT_SECRET = "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"

passport.use(new OAuth2Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    scope: ["profile", "email"],
  },
  function(accessToken, refreshToken, profile, cb) {
    UserModel.findOne({ googleId: profile.id }).exec()
      .then((user) => {
        if(!user){
          const newUser = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
          });

          return newUser.save();
        } else{
          user.name = profile.displayName;
          user.email = profile.email;

          return user.save();
        }
      })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleCallback: passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/signin"
  }),
};
