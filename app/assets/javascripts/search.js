$(function() {
  var searchResult = $("#user-search-result")

  function appendSearchResult(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  function appendNoUser(nouser) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${ nouser }
                  </p>
                </div>`
    return html;
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
        searchResult.empty();

        if (users.length !== 0) {
          users.forEach(function(user){
          var addMember = $('#' + user.id).attr('id');
            if (addMember != user.id){
              var html = appendSearchResult(user);
              searchResult.append(html)
            }
          })
        }

        else {
          var html = appendNoUser("一致するユーザーは見つかりません。")
          searchResult.append(html)
        }

      })

      .fail(function() {
        alert('名前検索に失敗しました。');
      })
    }

    else {
      searchResult.empty();
    }

  });
});

