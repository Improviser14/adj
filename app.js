const dotenv = require("dotenv").config(),
  express = require("express"),
  app = express(),
  router = express.Router(),
  httpsLocalhost = require("https-localhost"),
  serveStatic = require("serve-static");

//ssl must be configured on the application level --here
//uncomment this block when deploying see code at the bottom of this file
if (process.env.ENVIRONMENT === "prod") {
  app.use(function(req, res, next) {
    if (req.get("X-Forwarded-Proto") !== "https") {
      res.redirect("https://" + req.get("Host") + req.url);
    } else next();
  });
}

app.set("view engine", "ejs");

app.use(express.static("public/"));

//MAIN ROUTES

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/classes", function(req, res) {
  res.render("classes");
});

app.get("/in-person", function(req, res) {
  res.render("in-person");
});

app.get("/online-driver", function(req, res) {
  res.render("online-driver");
});

app.get("/failed-test-3x", function(req, res) {
  res.render("failed-test-3x");
});

app.get("/en-espanol", function(req, res) {
  res.render("en-espanol");
});

app.get("/in-car", function(req, res) {
  res.render("in-car");
});

if (process.env.ENVIRONMENT === "prod") {
  // sets port 8080 to default or unless otherwise specified in the environment
  app.set("port", process.env.PORT || 80);
  app.listen(app.get("port"));
} else {
  app.listen(8080, "127.0.0.1");
}
