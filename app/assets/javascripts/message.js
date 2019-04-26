$(function(){

  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__user">
                      <%= message.user.name %>
                    </p>
                    <p class="message__upper-info__date">
                      <%= message.created_at.strftime("%Y/%m/%d %H:%M")  %>
                    </p>
                  </div>
                  <p class="message__text">
                    <% if message.content.present? %>
                      <p class="lower-message__content">
                        <%= message.content %>
                      </p>
                    <% end %>
                    <%= image_tag message.image.url, class: 'form__mask__image' if message.image.present? %>
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
      messages.append(html)
    })

  })
})
