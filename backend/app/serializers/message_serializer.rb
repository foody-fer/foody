# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  chat_group_id :integer          not null
#  user_id       :integer          not null
#
# Indexes
#
#  index_messages_on_chat_group_id  (chat_group_id)
#  index_messages_on_user_id        (user_id)
#
# Foreign Keys
#
#  chat_group_id  (chat_group_id => chat_groups.id)
#  user_id        (user_id => users.id)
#
class MessageSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :content, :created_at, :updated_at, :chat_group_id, :user_id

  attribute :attachment_url do |object|
    image_url_for(object.attachment, size: 1000)
  end

  one :user, serializer: UserSerializer
end
