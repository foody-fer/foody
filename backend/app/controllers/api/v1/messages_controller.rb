class Api::V1::MessagesController < Api::V1::ApiController
  before_action :set_chat_group

  def index
    @messages = @chat_group.messages
    render json: MessageSerializer.new(@messages)
  end

  def create
    @message = @chat_group.messages.new(message_params)
    @message.user = Current.user
    if @message.save
      render json: MessageSerializer.new(@message), status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @message = @chat_group.messages.find(params[:id])
    if @message.user == Current.user
      @message.destroy
      head :no_content
    else
      render json: { error: 'You are not authorized to delete this message' }, status: :forbidden
    end
  end

  private

  def set_chat_group
    @chat_group = Current.user.chat_groups.find(params[:chat_group_id])
  end

  def message_params
    params.require(:message).permit(:content, :attachment)
  end
end
