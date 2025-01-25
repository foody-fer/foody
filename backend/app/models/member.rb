class Member < ApplicationRecord
  belongs_to :chat_group
  belongs_to :user
end
