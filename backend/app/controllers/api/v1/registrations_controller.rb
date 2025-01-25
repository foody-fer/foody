module Api::V1
  class RegistrationsController < ApiController
    skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.new(user_params)
      if params.dig(:user, :avatar_url).present?
        user.avatar.attach(
          io: URI.open(params.dig(:user, :avatar_url)),
          filename: "image.jpg",
          content_type: "image/jpeg"
        )
      end

      if user.save
        render json: { token: user.jwt }, status: :created
      else
        render json: { errors: format_errors(user) }, status: :unprocessable_entity
      end
    end

    def update
      if Current.user.update(update_user_params)
        render json: UserSerializer.new(Current.user), status: :ok
      else
        render json: { error: format_errors(Current.user) }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password, :first_name, :last_name, :gender, :phone)
    end

    def update_user_params
      params.require(:user).permit(:username, :bio, :first_name, :last_name, :gender, :phone, :avatar)
    end
  end
end

