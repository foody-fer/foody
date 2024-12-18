class Api::V1::UsersController < ApplicationController
    skip_before_action :verify_authenticity_token # Skip CSRF token for API requests
  
    def create
      user = User.new(user_params) # Create a new User instance with permitted parameters
  
      if user.save
        render json: { message: 'User created successfully', user: user }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    # Strong parameters to permit only allowed fields
    def user_params
      params.require(:user).permit(:name, :surname, :username, :gender, :contact, :email, :password)
    end
  end
  