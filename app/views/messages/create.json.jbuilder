json.content    @message.content
json.image      @message.image.url
json.date       @message.created_at.strftime("%Y/%m/%d(%E) %H:%M:%S")
json.user       @message.user.name
json.id         @message.id