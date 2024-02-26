const express = require("express");
const path = require("path");
const rutas = require("./routes/index.routes");
const motor = require("consolidate");
const app = express();
const morgan = require("morgan");
const moveride = require("method-override");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.set("port", process.env.PORT || 8000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(moveride("_method"));
app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  session({ secret: "M18T09K2003", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "./public")));

app.set("views", path.join(__dirname, "./public"));
app.engine("html", motor.mustache);
app.set("view engine", "html");

app.use(rutas);

module.exports = app;
