const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const router = express.Router();
const path = require('path');
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  request('https://graph.facebook.com/v2.9/search?q='+influencerName+'&type=page&access_token=1075628395822185|Y0CgNIZP8EiF2esClPtNaki4hiE', function (error, reqResponse, body) {
   var firstRequest = JSON.parse(body);
   try{
     var id = firstRequest.data[0].id;
   }
   catch(e){
     var json = facebookCreateJSON(null,true);
     res.send(json);
     return 0;
   }
    //time to make another request... another one!
     request('https://graph.facebook.com/v2.9/'+id+'?fields=bio,picture.width(800).height(800),engagement,name,username&access_token=1075628395822185|Y0CgNIZP8EiF2esClPtNaki4hiE', function (error, reqResponse, body) {
       try{

         var jsonFacebook = JSON.parse(body);
         var json = facebookCreateJSON(jsonFacebook);

       } catch(e){

         var json = facebookCreateJSON(null,true);

       }

       res.send(json);

     });
  });
})


function facebookCreateJSON(jsonFacebook,error){
  var facebookInfo = {
    "username": "N/A",
    "full_name": "N/A",
    "biography": "N/A",
    "image": "N/A",
    "followers": "N/A",
    "link":""
  };
  if(!error){
     facebookInfo =
    {
      "username": jsonFacebook.username,
      "full_name": jsonFacebook.name,
      "biography": jsonFacebook.bio,
      "image": jsonFacebook.picture.data.url,
      "followers": jsonFacebook.engagement.count,
      "link":"https://facebook.com/"+jsonFacebook.username
    }
  }

  return facebookInfo;
}

function nameParser(influencer){
  influencer = influencer.replace(/\s/g,'');
  return influencer;
}
module.exports = router;
