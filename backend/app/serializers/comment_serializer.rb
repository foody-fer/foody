# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_post_id  (post_id)
#  index_comments_on_user_id  (user_id)
#
# Foreign Keys
#
#  post_id  (post_id => posts.id)
#  user_id  (user_id => users.id)
#
class CommentSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :content, :post_id, :created_at, :updated_at

  attribute :user do |comment|
    {
      id: comment.user.id,
      username: comment.user.username,
      avatar: image_url_for(comment.user.avatar)
    }
  end
end
