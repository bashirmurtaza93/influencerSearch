var influencerObj = {};
$(document).ready(function(){

  searchInfluencer();
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
    renderPlatforms(influencerObj);
  })
}


function renderPlatforms(influencerObj){

  $.each(influencerObj,function(key,json){
    $('.'+key+'-name').text(json.full_name);
    $('.'+key+'-followers').text(json.followers);
    $('.'+key+'-photo').attr('src',json.image);
  });

}
