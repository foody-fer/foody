module Api::V1::Concerns::AuthConcern
  extend ActiveSupport::Concern

  def create_auth_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base, "HS256")
  end
end
