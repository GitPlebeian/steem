var express = require('express');
var app = express();
var router = express.Router();

var passport = require("passport");
var path = require("path");

// var User = require("./models/user");

app.set("view engine", "ejs");

router.get("/", function(req,res){
	res.render("homepage");
});
router.get("/login", function(req,res){
	res.render("login");
});
router.get("/signup", function(req,res){
	res.render("signup");
});
router.get("/discussions", function(req,res){
	res.render("discussions");
});


module.exports = router;
