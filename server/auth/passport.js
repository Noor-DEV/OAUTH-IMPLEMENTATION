const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../models/index");

const MY_STRATEGY = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, done) => {
    return User.findOne({
      where: {
        user_id: jwtPayload.user_id,
      },
    })
      .then((user) => {
        const formattedUser = user.toJSON();
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  }
);

passport.use(MY_STRATEGY);
