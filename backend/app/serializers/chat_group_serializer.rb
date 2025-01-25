class ChatGroupSerializer
    include Alba::Resource
    include ImageHelper
  
    attributes :id, :name, :created_at, :updated_at
  
    attribute :members do |chat_group|
      MemberSerializer.new(chat_group.members).serializable_hash[:data]
    end
  
    attribute :messages do |chat_group|
      MessageSerializer.new(chat_group.messages).serializable_hash[:data]
    end
  
    attribute :image do |chat_group|
      image_url_for(chat_group.image)
    end
  end