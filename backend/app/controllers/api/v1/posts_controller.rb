module Api::V1
  class PostsController < ApiController
    before_action :set_post, only: [:update, :destroy]
    before_action :authorize_user, only: [:update, :destroy]

    def index
      posts = Post.includes(:user)
                  .order(created_at: :desc)

      render json: PostSerializer.new(posts), status: :ok
    end

    def create
      post = Post.where(user: Current.user).create(post_params)

      if post.save
        render json: PostSerializer.new(post), status: :created
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      post = Post.find(params[:id])

      if post.update(post_params)
        render json: PostSerializer.new(post), status: :ok
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      post = Post.find(params[:id])

      if post.destroy
        render json: { message: "Post deleted" }, status: :ok
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def post_params
      params.require(:post).permit(:content, :title)
    end

    def set_post
      @post = Post.find(params[:id])
    end

    def authorize_user
      return if @post.user == Current.user

      render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
    end
  end
end
