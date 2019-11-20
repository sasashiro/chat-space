$(function(){
  function buildHTML(message){
    // var attachImage = message.image ? `<img src="${message.image}" class="message-main__image">`
    var insertImage = '';
        if (message.image.url) {
            insertImage = `<img src="${message.image.url}">`;
        }
    var html = `<div class="message">
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
    return html;
  }
  function scroll_view() {
    $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
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
    })
    .fail(function(){
      alert('error');
    });
  })
});