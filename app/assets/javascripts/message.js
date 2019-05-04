$(function(){
  var messagesSelector = $('.messages')
  var createMessageSelector = $('#create_message')
  var submitBtnSelector = $('.new_message__submit-btn')


  if (document.URL.match(/messages/)){
    var group_id = $('.main-header__current-group').attr('group_id');
    var reloadMessages = function(){
      var last_message_id = $('.message:last').data('message_id');
      $.ajax({
        url: '/groups/' + group_id + '/api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages){
        messages.forEach(function(message){
          var html = buildMessageHTML(message);
          messagesSelector.append(html)
          messagesSelector.animate({scrollTop: messagesSelector[0].scrollHeight}, 500, 'swing');
        });
      })

      .fail(function(){
        alert('自動更新が出来ていません。');
        submitBtnSelector.prop('disabled', false);
      });
    }
    setInterval(reloadMessages, 5000);
  };

  function buildMessageHTML(message){
    var messageContent = (message.content) ? message.content : ""
    var messageImage = (message.image) ? `<img class: 'form__mask__image' src="${message.image}">` : ""
    var html = `<div class="message" data-message_id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                      <p class="lower-message__content">
                        ${messageContent}
                      </p>
                    ${messageImage}
                  </p>
                </div>`
    return html;
  }

  createMessageSelector.on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      url: location.href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(messageData){
      var html = buildMessageHTML(messageData);
      messagesSelector.append(html)
      createMessageSelector[0].reset();
      messagesSelector.animate({scrollTop: messagesSelector[0].scrollHeight},500, 'swing');
      submitBtnSelector.prop('disabled', false);
    })

    .fail(function(){
      alert('メッセージが入っていません！');
      submitBtnSelector.prop('disabled', false);
    })
  })
})
