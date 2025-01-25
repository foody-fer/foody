# == Schema Information
#
# Table name: user_saved_posts
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_user_saved_posts_on_post_id              (post_id)
#  index_user_saved_posts_on_user_id              (user_id)
#  index_user_saved_posts_on_user_id_and_post_id  (user_id,post_id) UNIQUE
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class UserSavedPostSerializer
  include Alba::Resource

  attributes :id, :created_at

  one :user, serializer: UserSerializer
  one :post, serializer: PostSerializer
end
