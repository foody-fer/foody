class Api::V1::MessagesController < Api::V1::ApiController
    before_action :set_chat_group
  
    def index
      @messages = @chat_group.messages
      render json: MessageSerializer.new(@messages).serializable_hash
    end
  
    def show 
      @message = @chat_group.messages.find(params[:id])
      render json: MessageSerializer.new(@message).serializable_hash
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Message not found' }, status: :not_found
    end
  
    def create
      @message = @chat_group.messages.new(message_params)
      @message.user = Current.user
      if @message.save
        render json: MessageSerializer.new(@message).serializable_hash, status: :created
      else
        render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      @message = @chat_group.messages.find(params[:id])
      if @message.user == Current.user
        if @message.update(message_params)
          render json: MessageSerializer.new(@message).serializable_hash
        else
          render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'You are not authorized to update this message' }, status: :forbidden
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Message not found' }, status: :not_found
    end

  
    def destroy
      @message = @chat_group.messages.find(params[:id])
      if @message.user == Current.user
        @message.destroy
        head :no_content
      else
        render json: { error: 'You are not authorized to delete this message' }, status: :forbidden
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Message not found' }, status: :not_found
    end
  
    private
  
    def set_chat_group
      @chat_group = ChatGroup.find(params[:chat_group_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Chat group not found' }, status: :not_found
    end
  
    def message_params
      params.require(:message).permit(:content, :attachment)
    end
  end