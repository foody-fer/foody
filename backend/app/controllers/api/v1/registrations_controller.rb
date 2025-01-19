module Api::V1
  class RegistrationsController < ApiController
    include Api::V1::Concerns::AuthConcern

    skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.new(user_params)
      if user.save
        render json: { token: create_auth_token(user) }, status: :created
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

