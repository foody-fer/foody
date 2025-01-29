module Api::V1
  class MembersController < ApiController
    before_action :set_chat_group
  
    def index
      @members = @chat_group.members
      render json: MemberSerializer.new(@members)
    end
  
    def create
      @member = @chat_group.members.create(user_id: params[:user_id])
  
      if @member.save
        render json: { message: 'User added successfully to chat group' }, status: :created
      else
        render json: { errors: @member.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @member = @chat_group.members.find_by(id: params[:id])
  
      if @member
        if @member.destroy
          render json: { message: 'User removed successfully from chat group' }, status: :ok
        else
          render json: { errors: @member.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { errors: ['Member not found in this chat group'] }, status: :not_found
      end
    end
  
  
    private
  
    def set_chat_group
      @chat_group = Current.user.chat_groups.find(params[:chat_group_id])
    end
  end
end
