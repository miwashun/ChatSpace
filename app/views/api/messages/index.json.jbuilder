json.array! @new_messages do |new_message|
  json.content new_message.content
  json.image new_message.image
  json.created_at format_posted_time(new_message.created_at)
  json.user_name new_message.user.name
  json.id new_message.id
end
