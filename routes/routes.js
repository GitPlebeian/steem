var express = require('express');
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");

var app = express();
var router = express.Router();

var User = require("../models/user");

router.use(express.static(path.join(__dirname, "public")));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(flash());

router.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});	
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});	
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});	
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});	
});

router.get("/successlogin", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});	
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});	

});

router.get("/", function(req, res, next) {
console.log("get root");
	let thePath = path.resolve(__dirname,"public/views/homepage.ejs");		
	res.render('homepage');	
})
//  // User.find()
//  // .sort({ createdAt: "descending" })
//  // .exec(function(err, users) {
//  //   if (err) { return next(err); }
//  //   res.render("index", { users: users });
//  // });
// });


 router.get("/signup", function(req, res) {
 console.log("get signup");

	res.render('signup')	

 });

 router.get("/login", function(req, res) {
 console.log("get login");

	res.render('login')	

});
router.get("/discussions", function(req, res) {
console.log("get discussions");

	res.render('discussions')	
 });


//
router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
	res.render('homepage');	
  } else {	
	res.render('login');	
  }
});


router.get("/userInfo",function(req,res){
     if (req.isAuthenticated()) {
		res.json({username:req.user.username});
	}
	else {
		res.json(null);
	}
});




router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("post signup1");

    var newUser = new User({
      username: username,
      password: password
    });
console.log("post signup2");

    newUser.save(next);    //this line has to be called.
console.log("post signup done");

  });


}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));




router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));


app.set("view engine", "ejs");

// router.get("/", function(req,res){
// 	res.render("homepage");
// });
// router.get("/login", function(req,res){
// 	res.render("login");
// });
// router.get("/signup", function(req,res){
// 	res.render("signup");
// });
// router.get("/discussions", function(req,res){
// 	res.render("discussions");
// });


module.exports = router;
