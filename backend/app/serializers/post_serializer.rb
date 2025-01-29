# == Schema Information
#
# Table name: posts
#
#  id                     :integer          not null, primary key
#  comments_count         :integer          default(0), not null
#  content                :text             not null
#  likes_count            :integer          default(0), not null
#  title                  :string           not null
#  user_saved_posts_count :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  user_id                :integer          not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class PostSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :title, :content, :likes_count, :comments_count, :user_saved_posts_count, :liked_by_current_user, :saved_by_current_user, :created_at, :updated_at

  attribute :images do |post|
    post.images.map do |image|
      {
        id: image.id,
        url: image_url_for(image, size: 1000)
      }
    end
  end

  attribute :user do |post|
    {
      id: post.user.id,
      username: post.user.username,
      avatar: image_url_for(post.user.avatar, size: 100)
    }
  end
end
