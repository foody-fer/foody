module Api::V1
  class AuthController < ApiController
    include Api::V1::Concerns::AuthConcern

    skip_before_action :authenticate_user!, only: [:create]

    def index
      render json: UserSerializer.new(Current.user), status: :ok
    end

    def create
      user = User.find_by(email: user_params[:email])
      if user&.authenticate(user_params[:password])
        render json: { token: create_auth_token(user) }, status: :ok
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
