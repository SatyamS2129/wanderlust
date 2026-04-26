const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");

//requiring ejs-mate(to make templates)
const ejsMate = require("ejs-mate");
const Review = require("./models/reviews.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");

// requiring listings routes
const listingRouter = require("./routes/listing.js");
// requiring listings reviews routes
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// connecting to data base (mongo)
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}
/////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in monfo session store", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create(options),
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

////////////////////////////////////////////////////
// app.get("/", (req, res) => {
//   res.send("Hi, i am root");
// });

app.use(session(sessionOptions));
app.use(flash());

//  passport uses session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // stores details of user for the session
passport.deserializeUser(User.deserializeUser()); //

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // stores user detail of current session
  // console.log(res.locals.success); // success is an array
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld"); // second para is password
//   // this static register method automatically store the user and password in database
//   //  also automatically checks uniqueness of username

//   res.send(registeredUser);
// });

///////using listing routes/////////////////////////
app.use("/listings", listingRouter);
///////using listing review routes/////////////////////////
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// for all errors
app.all("*splat", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

//////// Error Handling middleware ///////////////////////
app.use((err, req, res, next) => {
  let { statusCode = 401, message = "something went wrong" } = err;
  //res.status(statusCode).send(message);
  console.log(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
