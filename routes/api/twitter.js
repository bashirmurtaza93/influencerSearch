const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const twitter = require('twitter');
const router = express.Router();
const path = require('path');
router.use(bodyParser.urlencoded({extended: true}));

var client = new twitter({
  consumer_key: '0Zg9dgzNaYnzClHyjVPQNDJY3',
  consumer_secret: 'An8saegfbVcXghKDtrcOr3KbpBHUsKZRceogm46GhrzL3VVaFx',
  access_token_key: '384983365-5bhMb7qYStsAuorPlB4EjHi9bSsF3LmI5ddAgCuv',
  access_token_secret: 'ycpSruTDut6ntp0360YIXjmtlDbLvUcQmVF5xyLocr9ug'
});



router.post('/', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  var params = {q: influencerName};
  client.get('users/search.json', params, function(error, tweets, response) {
    if (!error) {
      var jsonTwitter = JSON.parse(response.body);
      var json = twitterCreateJSON(jsonTwitter[0]);

    }else{
      var json = twitterCreateJSON(null,true);
    }
    res.send(json);

  });
});



function twitterCreateJSON(jsonTwitter,error){
  var twitterInfo = {
    "username": "N/A",
    "full_name": "N/A",
    "biography": "N/A",
    "image": "N/A",
    "followers": "N/A",
    "link":""
  };
  if(!error){

     twitterInfo =
    {
      "username": jsonTwitter.screen_name,
      "full_name": jsonTwitter.name,
      "biography": jsonTwitter.description,
      "image": jsonTwitter.profile_image_url.replace(/_normal/g,""),
      "followers": jsonTwitter.followers_count,
      "link":"https://twitter.com/"+jsonTwitter.screen_name
    }
  }

  return twitterInfo;
}

function nameParser(influencer){
  influencer = influencer.replace(/\s/g,'');
  return influencer;
}



module.exports = router;
