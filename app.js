var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");

var setUpPassport = require("./setuppassport");

var routes = require("./routes/routes")
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use('/views', express.static('./views'));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/images', express.static('./public/images'));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.set("view engine", "ejs");

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log('Starting server on port ' + port)
});
