module Api::V1
  class PostsCommentsController < ApiController
    before_action :set_post
    before_action :set_comment, only: [:update, :destroy]

    def index
      render json: CommentSerializer.new(@post.comments.order(created_at: :desc))
    end

    def create
      @comment = Current.user.comments.where(post: @post).new(comment_params)

      if @comment.save
        render json: CommentSerializer.new(@comment), status: :created
      else
        render json: { error: format_errors(@comment) }, status: :unprocessable_entity
      end
    end

    def update
      if @comment.update(comment_params)
        render json: CommentSerializer.new(@comment)
      else
        render json: { error: format_errors(@comment) }, status: :unprocessable_entity
      end
    end

    def destroy
      if @comment.destroy
        render json: { message: "Comment deleted" }
      else
        render json: { error: format_errors(@comment) }, status: :unprocessable_entity
      end
    end

    private

    def set_post
      @post = Post.find(params[:post_id])
    end

    def set_comment
      @comment = @post.comments.find_by(user: Current.user, id: params[:id])
      return if @comment.present?

      render json: { message: "Comment not found" }, status: :not_found
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
  end
end
