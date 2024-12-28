# == Schema Information
#
# Table name: likes
#
#  user_id    :integer          not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_likes_on_user_id_and_post_id  (user_id,post_id) UNIQUE
#

class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post, counter_cache: true

  validates :user_id, uniqueness: { scope: :post_id }
end
