const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl, // to save redirectUrl as passport deletes all the data before authenticating
    passport.authenticate("local", {
      failureRedirect: "/login", // passport does the login part
      failureFlash: true,
    }), // read on passpord npm
    wrapAsync(userController.afterLogin),
  );

router.get("/logout", userController.logout);

module.exports = router;
