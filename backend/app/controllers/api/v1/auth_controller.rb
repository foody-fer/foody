module Api::V1
  class AuthController < ApiController
    skip_before_action :authenticate_user!, only: [:create]

    def index
      render json: { message: "Hello World", email: Current.user.email }, status: :ok
    end

    def create
      user = User.find_by(email: user_params[:email])
      if user&.authenticate(user_params[:password])
        token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base, "HS256")

        render json: { token: token }, status: :ok
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end
