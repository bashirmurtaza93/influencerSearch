var influencerObj = {};
$(document).ready(function(){

  searchInfluencer();
  searchAgain();
});


function searchInfluencer(){
  $(document).on('click','#search-button',function(){
    search();
  })
  $(document).on('keyup','#influencer-search',function(e){
    if(e.which == 13){
      search();
    }
  })

}


function search(){
  var data = $('#influencer-search').val();
  var async1 = $.ajax({
    type: 'POST',
    url:'/instagram',
    data:{
      influencer: data
    },
    success: function(response){
      influencerObj.instagram = response;
    }
  });
  var async2 = $.ajax({
    type: 'POST',
    url:'/facebook',
    data:{
      influencer: data
    },
    success: function(response){
      influencerObj.facebook = response;
    }
  });
  var async3 = $.ajax({
    type: 'POST',
    url:'/twitter',
    data:{
      influencer: data
    },
    success: function(response){
      influencerObj.twitter = response;
    }
  });
  $.when(async3,async2,async1).done(function(){
    fadeOut();
    renderPlatforms(influencerObj);
  })
}


function renderPlatforms(influencerObj){

  $.each(influencerObj,function(key,json){

    $('.'+key+'-name').text(json.full_name);
    $('.'+key+'-followers').text(intToString(json.followers));
    $('.'+key+'-followers').attr('data-original-title',json.followers.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Followers');
    $('.'+key+'-photo').attr('src',json.image);
    $('.'+key+'-bio').text(json.biography);
    $('.'+key+'-link').attr('href',json.link);
    $('.platform-section').css('visibility','visible').hide().slideDown(1500);
  });

}

function fadeOut(){
  $('.info-container').fadeOut();
  setTimeout(function(){
    $('.search-again').css('visibility','visible').css('opacity','1').hide().fadeIn('5000');
  },4000);
}


function intToString (value) {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        var shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}

function searchAgain(){
  $(document).on('click','.search-again',function(){
    console.log('here');
    $('.search-again').fadeTo(1000,0,function(){
      $(this).css('visibility','hidden');
    });
    $('.platform-section').slideUp(1500);
    setTimeout(function(){
      $('.info-container').fadeIn(2000);
    },2000);

  });

}
