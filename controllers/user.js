const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    // error handling in case of uername already exists and for any other errors
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.afterLogin = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  // in case of we are logging in directly from login route
  // the res.locals.redirect will be empty so we are assiging default url

  res.redirect(redirectUrl);
  // req.session.redirectUrl to redirect the page where we were before login
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next();
    }
    req.flash("success", "You are now logged out");
    res.redirect("/listings");
  });
};
