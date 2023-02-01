//FINDORCREATE-IN-GOOGLE-PASSPORT

const user = await User.findOrCreate({
  where: { googleId: profile.id },
  defaults: defaultUser,
}).catch((err) => {
  done(err, null);
});

if (user && user[0]) {
  return done(null, user && user[0]);
}
