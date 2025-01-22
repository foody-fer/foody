module Api::V1
    class SavedPostsController < ApiController
        before_action :set_post

        #Show all the users that saved a post
        def show
            render json: SaveSerializer.new(@post.saves.includes(user: { avatar_attachment: :blob }))
        end

        #Show all the posts that the current user saved
        def index
            render json: SaveSerializer.new(Current.user.saves.includes(post: { user: { avatar_attachment: :blob } }))
        end

        def create
            save = @post.saves.find_or_initialize_by(user: Current.user)

            if save.persisted?
                render json: { message: "Already saved" }, status: :conflict
            else
                save.save!
                render json: { message: "Saved" }, status: :created
            end
        end

        def destroy
            save = @post.saves.find_by(user: Current.user)

            if save
                save.destroy
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