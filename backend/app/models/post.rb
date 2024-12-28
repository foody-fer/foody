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
end
