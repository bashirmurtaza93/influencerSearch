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
     request('https://graph.facebook.com/v2.9/'+id+'?fields=bio,picture.width(800).height(800),engagement,name,username,posts.limit(12){likes.summary(true),comments.summary(true)}&access_token=1075628395822185|Y0CgNIZP8EiF2esClPtNaki4hiE', function (error, reqResponse, body) {
       try{

         var jsonFacebook = JSON.parse(body);
         var json = facebookCreateJSON(jsonFacebook);

       } catch(e){

         var json = facebookCreateJSON(null,true);

       }
       console.log(json);
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
    console.log('here');
     var engagementObj = getFacebookEngagement(jsonFacebook);
     facebookInfo =
    {
      "username": jsonFacebook.username,
      "full_name": jsonFacebook.name,
      "biography": jsonFacebook.bio,
      "image": jsonFacebook.picture.data.url,
      "followers": jsonFacebook.engagement.count,
      "link":"https://facebook.com/"+jsonFacebook.username,
      "totalLikes":engagementObj.totalLikes,
      "totalComments":engagementObj.totalComments,
      "totalEngagement":engagementObj.totalEngagement,
      "avgLikes":engagementObj.avgLikes,
      "avgComments":engagementObj.avgComments,
      "avgEngagement":engagementObj.avgEngagement,
      "engagementRatio":engagementObj.engagementRatio

    }
  }

  return facebookInfo;
}

function getFacebookEngagement(jsonFacebook){
  var engagementObj = {
    "totalLikes":"",
    "totalComments":"",
    "totalEngagement":"",
    "avgLikes":"",
    "avgComments":"",
    "avgEngagement":"",
    "engagementRatio":""
  }
  var post = 0
  var likes = 0;
  var comments = 0;
  for (var i = 0; i < jsonFacebook.posts.data.length; i++){

    likes += jsonFacebook.posts.data[i].likes.summary.total_count;
    comments += jsonFacebook.posts.data[i].comments.summary.total_count;
    post++;
  }

  engagementObj.totalLikes = likes;
  engagementObj.totalComments = comments;
  engagementObj.totalEngagement = likes + comments;
  engagementObj.avgLikes = likes/post;
  engagementObj.avgComments = comments/post;
  engagementObj.avgEngagement = (likes + comments) / post;
  engagementObj.engagementRatio = ( ( engagementObj.totalEngagement / post) / jsonFacebook.engagement.count) * 100;
  return engagementObj;
}

function nameParser(influencer){
  influencer = influencer.replace(/\s/g,'');
  return influencer;
}
module.exports = router;
