# == Schema Information
#
# Table name: chat_groups
#
#  id         :integer          not null, primary key
#  is_dm      :boolean
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChatGroupSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :is_dm, :created_at, :updated_at
  many :members, serializer: MemberSerializer
  # many :messages, serializer: MessageSerializer

  attribute :name do |chat_group|
    if chat_group.is_dm
      chat_group.other_user&.user&.name
    else
      chat_group.name
    end
  end

  attribute :image do |chat_group|
    if chat_group.is_dm
      image_url_for(chat_group.other_user&.user&.avatar, size: 100)
    else
      image_url_for(chat_group.image, size: 100)
    end
  end
end
