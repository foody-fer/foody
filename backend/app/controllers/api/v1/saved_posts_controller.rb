module Api::V1
  class SavedPostsController < ApiController
    before_action :set_post, only: [ :show, :create, :destroy ]

    # Show all the posts that the current user saved
    def index
      render json: UserSavedPostSerializer.new(UserSavedPost.with_relations(Current.user.user_saved_posts))
    end

    # Show all the users that saved a post
    def show
      render json: UserSavedPostSerializer.new(UserSavedPost.with_relations(@post.user_saved_posts))
    end

    def create
      save = @post.user_saved_posts.find_or_initialize_by(user: Current.user)

      if save.persisted?
        render json: { message: "Already saved" }, status: :conflict
      else
        save.save!
        render json: { message: "Saved" }, status: :created
      end
    end

    def destroy
      save = @post.user_saved_posts.find_by(user: Current.user)

      if save&.destroy
        render json: { message: "Unsaved" }, status: :ok
      else
        render json: { message: "Not saved" }, status: :not_found
      end
    end

    private

    def set_post
      @post = Post.find(params[:post_id])
    end
  end
end
