var influencerObj = {};
$(document).ready(function(){

  searchInfluencer();
});


function searchInfluencer(){

  $(document).on('click','#searchButton',function(){
    var data = $('#influencerSearch').val();

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
  })


}

function renderPlatforms(influencerObj){

  $.each(influencerObj,function(key,json){
    $('.'+key+'Name').text(json.full_name);
    $('.'+key+'Followers').text(json.followers);
    $('.'+key+'Photo').attr('src',json.image);
  });

}
