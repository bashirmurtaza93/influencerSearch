const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const path = require('path');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname+ '/../public/html/index.html'));
});
module.exports = router;
