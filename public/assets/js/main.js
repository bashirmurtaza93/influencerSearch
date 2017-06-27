$(document).ready(function(){
  checkInput();
})


function checkInput(){
  $(document).on('keyup','#influencer-search',function(){
    if($(this).val().length > 0){
      $('#search-button').css('color','white');
    }else{
      $('#search-button').css('color','#9C9C9C');
    }
  });

}
