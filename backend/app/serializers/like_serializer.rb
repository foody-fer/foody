# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_likes_on_post_id              (post_id)
#  index_likes_on_user_id              (user_id)
#  index_likes_on_user_id_and_post_id  (user_id,post_id) UNIQUE
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class LikeSerializer
  include Alba::Resource

  attributes :id, :created_at

  one :user, serializer: UserSerializer
end
