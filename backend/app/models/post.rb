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
class Post < ApplicationRecord
  belongs_to :user

  has_many_attached :images

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :user_saved_posts, dependent: :destroy

  validates :title, presence: true
  validates :content, presence: true

  def liked_by_current_user
    return @liked_by_current_user unless @liked_by_current_user.nil?

    @liked_by_current_user = likes.where(user: Current.user).exists?
  end

  def liked_by_current_user=(value)
    @liked_by_current_user = value
  end

  def saved_by_current_user
    return @saved_by_current_user unless @saved_by_current_user.nil?

    @saved_by_current_user = user_saved_posts.where(user: Current.user).exists?
  end

  def saved_by_current_user=(value)
    @saved_by_current_user = value
  end
end
