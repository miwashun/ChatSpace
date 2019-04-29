
$(function() {
  $("#user-search-result").on('click',".chat-group-user__btn--add",function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    addbtn(id,name)
    $(this).parent().remove();
  });
  $(".js-add-user").on('click',".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  });
});
