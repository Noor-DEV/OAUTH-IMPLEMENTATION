const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/index");

const GOOGLE_CALLBACK_URL = "http://localhost:8080/auth/google/callback";

const GOOGLE_STRATEGY = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const defaultUser = {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value,
      googleId: profile.id,
    };
    //CAN_USE_FINDORCREATE METOD ---> await User.findOrCreate({where:{googleId:pro.id},defaults:defaultUser});
    User.findOne({ where: { googleId: profile.id } })
      .then((user) => {
        if (!user) {
          User.create(defaultUser)
            .then((createdUser) => {
              console.log("..........USER_CREATED............");
              const formattedUser = createdUser.toJSON();
              done(null, formattedUser);
            })
            .catch((err) => {
              console.log(
                err,
                ".......user-DOES_NOT_EXIST_BUT ERR CREATING IT............."
              );
              done(err, null);
            });
        } else {
          console.log(
            "......USER_ALREADY-EXISTS-WE'LL TRY LOGGING U IN........."
          );
          done(null, user.toJSON());
        }
      })
      .catch((err) => {
        console.log(
          "........ERROR_FINDING_THE_USER/QUERYING DB....CAN'T BE CREATED IF NOT SURE..."
        );
        done(err, null);
      });
  }
);

passport.use(GOOGLE_STRATEGY);
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  User.findOne({ where: { user_id } })
    .then((user) => {
      if (user) {
        return done(null, user.toJSON());
      }
    })
    .catch((err) => {
      console.log(".........error desiUser........", err);
      done(err, null);
    });
});
