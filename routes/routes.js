var express = require('express');
var app = express();


app.set("view engine", "ejs");

app.get("/", function(req,res){
	console.log("Someone connected to home")
	res.render("/views/homepage");
});