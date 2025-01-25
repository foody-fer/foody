class Api::V1::ChatGroupsController < ApplicationController
    def index
      @chat_groups = ChatGroup.all
      render json: ChatGroupSerializer.new(@chat_groups).serializable_hash
    end
  
    def show
      @chat_group = ChatGroup.find(params[:id])
      render json: ChatGroupSerializer.new(@chat_group, include: [:members, :messages]).serializable_hash
    end
  
    def create
      @chat_group = ChatGroup.new(chat_group_params)
  
      if @chat_group.save
        if params[:user_ids].present?
          @chat_group.add_users(params[:user_ids])  # Assuming you have an add_users method
        end
        render json: ChatGroupSerializer.new(@chat_group).serializable_hash, status: :created
      else
        render json: { errors: @chat_group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      @chat_group = ChatGroup.find(params[:id])
  
      if @chat_group.update(chat_group_params)
        render json: ChatGroupSerializer.new(@chat_group, include: [:members, :messages]).serializable_hash, status: :ok
      else
        render json: { errors: @chat_group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @chat_group = ChatGroup.find(params[:id])
      @chat_group.destroy
      head :no_content
    end
  
    private
  
    def chat_group_params
      params.require(:chat_group).permit(:name, :image, user_ids: [])
    end
  end