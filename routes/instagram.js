const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://DBINFO', (err, database) =>{
  if(err) return console.log(err);
  db = database


})

router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  //Update database information
  dbUpdates(influencerName);

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
  influencer = influencer.replace(/\s/g,'');
  return influencer;
}


function instagramCreateJSON(jsonInstagram, error){
  var instagramInfo = {
    "username": "N/A",
    "full_name": "N/A",
    "biography": "N/A",
    "image": "N/A",
    "followers": "N/A",
    "link":""
  }
  if(!error){
    instagramInfo = {
      "username": jsonInstagram.user.username,
      "full_name": jsonInstagram.user.full_name,
      "biography": jsonInstagram.user.biography,
      "image": jsonInstagram.user.profile_pic_url_hd,
      "followers": jsonInstagram.user.followed_by.count,
      "link": "https://instagram.com/"+jsonInstagram.user.username
    }
  }
  return instagramInfo;
}


function dbUpdates(influencerName){
  var dbObj = {
    "influencer":influencerName
  }
  db.collection('influencers').find(dbObj).toArray(function(err,results){
    if(results.length != 0){
      results[0].search++;
      var newSearch = results[0].search;
      db.collection('influencers').update({influencer: influencerName}, {$set: {search: newSearch}}, false,true);

    }
    else{
      dbObj.search = 1;
      db.collection('influencers').save(dbObj, (err,result)=>{
        if(err) return console.log(err);
        console.log('saved');
      })
    }
  })
}
module.exports = router;
