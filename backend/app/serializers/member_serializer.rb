class MemberSerializer
    include Alba::Resource
  
    attributes :id, :user_id, :chat_group_id
  

    one :user, serializer: UserSerializer
  end