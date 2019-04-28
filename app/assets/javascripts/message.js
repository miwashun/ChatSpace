$(function(){
  var messagesSelector = $('.messages')
  var createMessageSelector = $('#create_message')
  var submitBtnSelector = $('.new_message__submit-btn')

  function buildHTML(message){
    var messageImage = (message.image) ? `<img class: 'form__mask__image' src="${message.image}">` : ""
    var html = `<div class="message">
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
                        ${message.content}
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

    .done(function(data){
      var html = buildHTML(data);
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
