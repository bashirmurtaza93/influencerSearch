const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const router = express.Router();

var index = require(__dirname + '/routes/index');
var instagram = require(__dirname + '/routes/instagram');
var facebook = require(__dirname + '/routes/facebook');
var twitter = require(__dirname + '/routes/twitter');
//API REQUEST
var apiInstagram = require(__dirname + '/routes/api/instagram');
var apiFacebook = require(__dirname + '/routes/api/facebook');
var apiTwitter = require(__dirname + '/routes/api/twitter');


app.use('/public' ,express.static(__dirname+ '/public'));
app.use('/',index);
app.use('/instagram',instagram);
app.use('/facebook',facebook);
app.use('/twitter',twitter);
//API REQUEST SECTIONS
app.use('/api/instagram',apiInstagram);
app.use('/api/facebook',apiFacebook);
app.use('/api/twitter',apiTwitter);


var port = 3000;
var server = app.listen(port, function(){
  console.log('Listening on port '+ port);
})
module.exports = router;
