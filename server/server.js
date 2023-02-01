const express = require("express");
const https = require("https");
const fs = require("fs");
const passport = require("passport");
const apiRouter = require("./api/index");
const cors = require("cors");
const cookieSession = require("cookie-session");
const errorHandler = require("./errorHandler");
const path = require("path");
// const { sequelize, User } = require("./models/index");

require("dotenv").config();
require("./auth/passport");
require("./auth/passportGoogleSSO");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.headers, "........req.headers..........");
  console.log(req.isAuthenticated(), ".........REQ.ISAUHTED()........");
  next();
});
app.get("/", (req, res) => {
  res.json({ msg: "ALL_GOOD" });
});
app.use(apiRouter);
app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

module.exports = app;
