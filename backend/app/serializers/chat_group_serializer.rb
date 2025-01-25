# == Schema Information
#
# Table name: chat_groups
#
#  id         :integer          not null, primary key
#  image      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChatGroupSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :name, :created_at, :updated_at
  many :members, serializer: MemberSerializer
  # many :messages, serializer: MessageSerializer

  attribute :image do |chat_group|
    image_url_for(chat_group.image)
  end
end
