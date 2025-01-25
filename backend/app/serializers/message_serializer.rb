class MessageSerializer
    include Alba::Resource
    include ImageHelper
    attributes :id, :content, :created_at, :updated_at, :chat_group_id, :user_id
  
    attribute :attachment_url do |object|
          Rails.application.routes.url_helpers.rails_blob_url(object.attachment, only_path: true) if object.attachment.attached?
    end
  
    attribute :user do |message|
        UserSerializer.new(message.user).serializable_hash[:data]
    end
  end