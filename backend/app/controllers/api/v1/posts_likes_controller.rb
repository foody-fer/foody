module Api::V1
  class PostsLikesController < ApiController
    before_action :set_post

    def show
      render json: LikeSerializer.new(@post.likes.includes(user: { avatar_attachment: :blob }))
    end

    def create
      like = @post.likes.find_or_initialize_by(user: Current.user)

      if like.persisted?
        render json: { message: "Already liked" }, status: :conflict
      else
        like.save!
        render json: { message: "Liked" }, status: :created
      end
    end

    def destroy
      like = @post.likes.find_by(user: Current.user)

      if like
        like.destroy
        render json: { message: "Unliked" }, status: :ok
      else
        render json: { message: "Not liked" }, status: :not_found
      end
    end

    private

    def set_post
      @post = Post.find(params[:post_id])
    end
  end
end
