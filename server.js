const express = require("express");

const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Telling express app to use File upload package
app.use(fileUpload());

// dotenv package
// require('dotenv').config();

// Using sessions to keep track of our user's login status
app.use(
  session({ secret: "the secret that always changes", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (for deployment on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to Mongo DB (Cloud Atlas OR localhost)
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/brainscribe",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
