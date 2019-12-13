$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var insertImage = message.image ? `<img src="${message.image}" class="message-main__image">`: "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message-upper">
                      <div class="message-upper__group">
                        ${message.user}
                      </div>
                      <div class="message-upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message-main">
                      <p class="message-main__text">
                        ${message.content}
                      </p>
                      ${insertImage}
                    </div>
                  </div>`
    } else if (message.content) {
      var insertImage = message.image ? `<img src="${message.image}" class="message-main__image">`: "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message-upper">
                      <div class="message-upper__group">
                        ${message.user}
                      </div>
                      <div class="message-upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message-main">
                      <p class="message-main__text">
                        ${message.content}
                      </p>
                      ${insertImage}
                    </div>
                  </div>`
    } else if (message.image) {
      var insertImage = message.image ? `<img src="${message.image}" class="message-main__image">`: "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message-upper">
                      <div class="message-upper__group">
                        ${message.user}
                      </div>
                      <div class="message-upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message-main">
                      <p class="message-main__text">
                        ${message.content}
                      </p>
                      ${insertImage}
                    </div>
                  </div>`
    };
    return html;
  };
  function scroll_view() {
    $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
  }
  function form_reset() {
    $('#new_message')[0].reset();
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      scroll_view();
      form_reset();
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    });
  });
  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id')
    $.ajax({
      url:      'api/messages',
      type:     'get',
      dataType: 'json',
      data:     {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      scroll_view();
    })
    .fail(function() {
      alert('メッセージが送信できません');
    });
  };
  // setInterval(reloadMessages, 7000)
});