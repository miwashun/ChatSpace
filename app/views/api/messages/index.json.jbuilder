json.array! @new_message do |new_message|
  json.content new_message.content
  json.image new_message.image.url
  json.created_at  new_message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name new_message.user.name
  json.user_id new_message.user.id
  json.id new_message.id
end
