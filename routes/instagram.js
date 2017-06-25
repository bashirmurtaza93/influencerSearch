const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const router = express.Router();
const path = require('path');
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  console.log(influencerName);
  request('http://www.instagram.com/'+influencerName+'?__a=1', function (error, reqResponse, body) {
   try{
       var jsonInstagram  = JSON.parse(body);
       var json = instagramCreateJSON(jsonInstagram);

      } catch(e){
        var json = instagramCreateJSON(null,true);
      }

   res.send(json)
  });

})


function nameParser(influencer){
  influencer.replace(/\s/g,'');
  return influencer;
}


function instagramCreateJSON(jsonInstagram, error){
  var instagramInfo = {
    "username": "N/A",
    "full_name": "N/A",
    "biography": "N/A",
    "image": "N/A",
    "followers": "N/A"
  }
  if(!error){
    instagramInfo = {
      "username": jsonInstagram.user.username,
      "full_name": jsonInstagram.user.full_name,
      "biography": jsonInstagram.user.biography,
      "image": jsonInstagram.user.profile_pic_url_hd,
      "followers": jsonInstagram.user.followed_by.count
    }
  }
  return instagramInfo;
}
module.exports = router;
