const express = require("express");
const LoginWithGoogleApi = require("./LoginWithGoogle");
const { isUserAuthenticated } = require("../middlewares/auth");
const userApi = require("./user");

const router = express.Router();

router.get("/secret", isUserAuthenticated, (req, res) => {
  res.json({
    user: req.user || "USER_ATTACHED",
  });
});
router.get("/wow", (req, res) => {
  res.json({ user: req.user, authed: req.isAuthenticated(), CTX: "noor" });
});

router.use(LoginWithGoogleApi);
router.use(userApi);

module.exports = router;
