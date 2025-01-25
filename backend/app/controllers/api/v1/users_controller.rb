module Api
    module V1
      class UsersController < ApplicationController
        def index
          if params[:username].present?
            query = params[:username].downcase
            @users = User.where("LOWER(username) LIKE ?", "%#{query}%")
          else
            @users = User.all
          end
  
          render json: UserSerializer.new(@users).serializable_hash # Use serializers
        end
      end
    end
  end