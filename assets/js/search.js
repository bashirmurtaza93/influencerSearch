var influencerObj = {};
$(document).ready(function(){

  searchInfluencer();
});


function searchInfluencer(){

  $(document).on('click','#searchButton',function(){
    var data = $('#influencerSearch').val();

    var async1 = $.ajax({
      type: 'POST',
      url:'/findInstagram',
      data:{
        influencer: data
      },
      success: function(response){
        influencerObj.instagram = response;
      }
    });
    var async2 = $.ajax({
      type: 'POST',
      url:'/findFacebook',
      data:{
        influencer: data
      },
      success: function(response){
        influencerObj.facebook = response;
      }
    });
    var async3 = $.ajax({
      type: 'POST',
      url:'/findTwitter',
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
  $.each(influencerObj,function(key,val){
    switch (key) {
      case 'instagram':
        renderInstagram(val);
        break;
      case 'facebook':
        console.log('In facebook');
        break;
      case 'twitter':
        console.log('In twitter');
        break;


    }
  });

function renderInstagram(val){
  $('.instagramName').text(val.user.full_name);
  $('.instagramFollowers').text(val.user.followed_by.count);
  $('.instagramPhoto').attr('src',val.user.profile_pic_url_hd);
}

}
