module Api::V1
  class ApiController < ApplicationController
    before_action :authenticate_user!

    def authenticate_user!
      raw_token = request.headers["Authorization"]
      return render json: { error: "Unauthorized", message: "Token is missing" }, status: :unauthorized if raw_token.blank?
      return render json: { error: "Unauthorized", message: "Invalid token" }, status: :unauthorized unless raw_token.match?(/^Bearer /)

      token = raw_token.split(" ")[1]

      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, "HS256").first
      Current.user = User.find_by(id: decoded_token["user_id"])

      return if Current.user.present?

      render json: { error: "Unauthorized", message: "Invalid token" }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { error: "Unauthorized", message: "Invalid token" }, status: :unauthorized
    end
  end
end
