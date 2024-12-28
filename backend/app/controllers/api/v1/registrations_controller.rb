module Api::V1
  class RegistrationsController < ApiController
    skip_before_action :authenticate_user!

    def create
      user = User.new(user_params)
      if user.save
        render json: { message: "User created successfully" }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password, :first_name, :last_name, :gender)
    end
  end
end

