var express = require('express');
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser')
var formidable = require('formidable');
var cookieParser = require("cookie-parser");

var fs = require('fs');
var app = express();
var router = express.Router();
router.use(flash());
var User = require("../models/user");

var data = require('../mongo')
let db = new data();


router.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.use(express.static(path.join(__dirname, "public")));


router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());


router.use(passport.initialize());
router.use(passport.session());

router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.redirect('/');
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.redirect('/login');
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.redirect('/');
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.redirect('/login');	
});

router.get("/successlogin", function(req, res) {
  if(req.user.banned == true){
    res.redirect('/faillogin');
  } else{
  console.log("get successsignup");
  res.redirect('/');
  }
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.render('login');

});

router.get("/admin",function(req,res){
  if(req.user.admin == true)
  res.render('admin');
else
  res.redirect('/');
});

router.get("/", function(req, res, next) {
console.log("get root");
	res.render('homepage');	
})
//  // User.find()
//  // .sort({ createdAt: "descending" })
//  // .exec(function(err, users) {
//  //   if (err) { return next(err); }
//  //   res.render("index", { users: users });
//  // });
// });
User.findOne({ username: "admin" }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      return; 
    }
console.log("post signup1");
    
    var newUser = new User({
      username: "admin",
      password: "shroud",
      admin: true
    });

    newUser.save();  
  });


 router.get("/friends", function(req, res) {
 console.log("get friends");
  if(!req.isAuthenticated()){
    res.redirect('/login');
  } else {
    res.render('friends')
  }
    

 });

 router.get("/signup", function(req, res) {
 console.log("get signup");
  if(req.isAuthenticated()){
    res.redirect('/');
  } else {
    res.render('signup')
  }
		

 });

 router.get("/login", function(req, res) {
 console.log("get login");

	if(req.isAuthenticated()){
    res.redirect('/');
  } else {
    res.render('login')
  }

});
router.get("/discussions", function(req, res) {
  if(req.isAuthenticated()){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip.slice(6));

    res.render('discussions')
  } else {
    res.redirect('/login')
  }
		
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
  console.log("routes userinfo");
     if (req.isAuthenticated()) {
      console.log("I am authenticated");
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

  console.log('User Signing up')
  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("post signup1");
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    var newip = ip.slice(7,ip.length)
    console.log("ip " + ip);
    console.log("newip " + newip);


    var newUser = new User({
      username: username,
      password: password,
      ip: newip
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

router.get("/getUsernames",function(req,res){
  User.find({},function(error,user) {
  if (error) {
    return res.json(null);
  } else {
    let objs = [];
    for (let i=0;i<user.length;i++) {
      objs.push({username:user[i].username});
    }
    return res.json(objs);
  }
});

});

router.delete('/deleteLogin/:username', function(req, res){

    User.remove({username:req.params.username},function(error,removed) {
        if (error) {
            return res.json(null);
        }
        return res.json(req.params.username);
    });

//  res.json(db.deleteObjectWithID(req.params.ident));
});

router.post("/ban", function(req, res) {
 console.log("get friends");
  if(req.user.admin == true){
    User.findOneAndUpdate({ip:req.body.ip},{banned:true},function(error,user) {
          if (error) {
              return res.json(null);
          }
          else if (user == null) {
              return res.json(null);
          }
          return res.json("success");
      });


  } else {
    
  }
    

 });

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


router.get("/games", function(req, res) {
    res.render('addObject');
  });

router.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    console.log(oldpath)
    var newpath = __dirname + '/public/images/' + files.filetoupload.name;
    console.log(newpath)
    var picturei =  '/public/images/' + files.filetoupload.name;

    console.log('in post ' + fields.game + ' ' + fields.price + ' ' + fields.description + ' ' + picturei);

    db.addObject({game:fields.game,price:fields.price,picture:picturei,description:fields.description});
    fs.rename(oldpath, newpath, function () {
    if (err) throw err;
        res.redirect("/");
      });
    });
});

module.exports = router;

