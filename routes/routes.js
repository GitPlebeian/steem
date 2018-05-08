var express = require('express');
var app = express();
var router = express.Router();

app.set("view engine", "ejs");

router.get("/", function(req,res){
	console.log("Someone connected to home")
	res.render("homepage");

});

module.exports = router;