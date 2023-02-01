module.exports.isUserAuthenticated = (req, res, next) => {
  if (!req.user) {
    console.log("NOT-AUTHENTICATED...............");
    return res
      .status(401)
      .send(
        "You must login first!<h1><br/><a href='/login/google'>Login With Google"
      );

    // .send(
    //   "<h1>You must login first!<h1><br/><a href='/login/google'>Login With Google</a>"
    // );
  }
  console.log("YES-AUTHENTICATED-------------------------");

  next();
};
