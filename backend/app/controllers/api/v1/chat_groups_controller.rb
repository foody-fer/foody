module Api::V1
  class ChatGroupsController < ApiController
    def index
      render json: ChatGroupSerializer.new(Current.user.chat_groups)
    end
  
    def show
      @chat_group = Current.user.chat_groups.find(params[:id])
      render json: ChatGroupSerializer.new(@chat_group)
    end
  
    def create
      @chat_group = ChatGroup.new(chat_group_params)
      @chat_group.members.build(user: Current.user)

      if params[:chat_group][:user_ids].blank?
        return render json: { errors: "You need to pass user_ids array" }, status: :unprocessable_entity
      end

      if @chat_group.is_dm
        if params[:chat_group][:user_ids].length != 1
          return render json: { errors: "DM must have exactly one user" }, status: :unprocessable_entity
        end

        @chat_group.name = User.find(params[:chat_group][:user_ids].first).name
      end

      params[:chat_group][:user_ids].each do |user_id|
        @chat_group.members.build(user_id: user_id)
      end

      debugger

      if @chat_group.save
        render json: ChatGroupSerializer.new(@chat_group), status: :created
      else
        render json: { errors: @chat_group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      @chat_group = Current.user.chat_groups.find(params[:id])
  
      if @chat_group.update(chat_group_params)
        render json: ChatGroupSerializer.new(@chat_group), status: :ok
      else
        render json: { errors: @chat_group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @chat_group = Current.user.chat_groups.find(params[:id])
      @chat_group.destroy
      head :no_content
    end
  
    private

    def chat_group_params
      params.require(:chat_group).permit(:name, :image, :is_dm)
    end
  end
end
