const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const twitter = require('twitter');
var client = new twitter({
  consumer_key: '0Zg9dgzNaYnzClHyjVPQNDJY3',
  consumer_secret: 'An8saegfbVcXghKDtrcOr3KbpBHUsKZRceogm46GhrzL3VVaFx',
  access_token_key: '384983365-5bhMb7qYStsAuorPlB4EjHi9bSsF3LmI5ddAgCuv',
  access_token_secret: 'ycpSruTDut6ntp0360YIXjmtlDbLvUcQmVF5xyLocr9ug'
});


app.use('/assets' ,express.static(__dirname+ '/assets'));
app.use('/global' ,express.static(__dirname+ '/global'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})


app.post('/findInstagram', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  console.log(influencerName);
  request('http://www.instagram.com/'+influencerName+'?__a=1', function (error, reqResponse, body) {
   try{
     var jsonInstagram  = JSON.parse(body);
   } catch(e){
     var jsonInstagram =
     {
      "user":
      {
       'biography':'nothing found',
       'image':'images/nothing.jpg'
      }
    }
   }

   console.log(jsonInstagram);
   res.send(jsonInstagram)
  });

})



app.post('/findFacebook', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  request('https://graph.facebook.com/v2.9/search?q='+influencerName+'&type=page&access_token=1075628395822185|Y0CgNIZP8EiF2esClPtNaki4hiE', function (error, reqResponse, body) {
   var firstRequest = JSON.parse(body);
   try{
     var id = firstRequest.data[0].id;
   }
   catch(e){
     var jsonFacebook = facebookError();
     res.send(jsonFacebook);
     return 0;
   }
   console.log(id);
   //time to make another request... another one!
     request('https://graph.facebook.com/v2.9/'+id+'?fields=about,picture,engagement&access_token=1075628395822185|Y0CgNIZP8EiF2esClPtNaki4hiE', function (error, reqResponse, body) {
       try{
         var jsonFacebook = JSON.parse(body);
       } catch(e){

         var jsonFacebook = facebookError();

       }
       console.log(jsonFacebook);
       res.send(jsonFacebook)

     });
  });
})


app.post('/findTwitter', function(req,res){
  var influencerName = nameParser(req.body.influencer);
  var params = {q: influencerName};
  client.get('users/search.json', params, function(error, tweets, response) {
    if (!error) {
      var jsonTwitter = JSON.parse(response.body);
      res.send(jsonTwitter[0]);
    }
  });
});



function facebookError(){
  var jsonFacebook =
  {
    "data":
    {
      "about" : "nothing here",
      "id": "nothing here"
    }

  }

  return jsonFacebook;
}

function nameParser(influencer){
  influencer.replace(/\s/g,'');
  return influencer;
}


var port = 3000;
var server = app.listen(port, function(){
  console.log('Listening on port '+ port);
})
