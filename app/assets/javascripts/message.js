$(function(){

  function buildHTML(message){
    var MessageImage = (message.image) ? `<img class: 'form__mask__image' src="${message.image}">` : ""
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
                    ${MessageImage}
                  </p>
                </div>`
    return html;
  }

  $('#create_message').on('submit', function(e){
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
      $('.messages').append(html)
      $('#create_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},500, 'swing');
      $('.new_message__submit-btn').prop('disabled', false);
    })

    .fail(function(){
      alert('メッセージが入っていません！');
      $('.new_message__submit-btn').prop('disabled', false);
    })
  })
})
