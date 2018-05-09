var express = require('express')
var bodyParser = require('body-parser')

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

app.set("view engine", "ejs");
var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log('Starting server on port ' + port)
});
