class MemberSerializer
    include Alba::Resource
  
    attributes :id, :user_id, :chat_group_id
  

    attribute :user do |member|
      UserSerializer.new(member.user).serializable_hash[:data]
    end
  end