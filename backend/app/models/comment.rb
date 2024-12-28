# == Schema Information
#
# Table name: comments
#
#  user_id    :integer          not null
#  post_id    :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post, counter_cache: true

  validates :content, presence: true
end
