$(function() {
  function appendSearchResult(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
                $("#user-search-result").append(html);
                (`#data-user-id="${user.id}"`)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input != "") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendSearchResult(user);
          })
        }
      })

      .fail(function() {
        alert('名前検索に失敗しました。');
      })
    }

    else {
      $("#user-search-result").empty();
    }

  });
});

