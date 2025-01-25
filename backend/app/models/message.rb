class Message < ApplicationRecord
  belongs_to :chat_group
  belongs_to :user

  has_one_attached :attachment
end
