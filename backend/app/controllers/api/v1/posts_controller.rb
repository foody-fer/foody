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
      post = Post.where(user: Current.user).create(create_post_params)

      if post.save
        render json: PostSerializer.new(post), status: :created
      else
        render json: { errors: format_errors(post) }, status: :unprocessable_entity
      end
    end

    def show
      post = Post.find(params[:id])

      render json: PostSerializer.new(post), status: :ok
    end

    def update
      post = Post.find(params[:id])

      if update_post_images_params[:add_images].present?
        post.images.attach(update_post_images_params[:add_images])
      end

      if update_post_images_params[:remove_images].present?
        update_post_images_params[:remove_images].each do |image_id|
          post.images.find(image_id).purge
        end
      end

      if post.update(update_post_params)
        render json: PostSerializer.new(post), status: :ok
      else
        render json: { errors: format_errors(post) }, status: :unprocessable_entity
      end
    end

    def destroy
      post = Post.find(params[:id])

      if post.destroy
        render json: { message: "Post deleted" }, status: :ok
      else
        render json: { errors: format_errors(post) }, status: :unprocessable_entity
      end
    end

    private

    def create_post_params
      params.require(:post).permit(:content, :title, images: [])
    end

    def update_post_params
      params.require(:post).permit(:content, :title)
    end

    def update_post_images_params
      params.require(:post).permit(add_images: [], remove_images: [])
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
