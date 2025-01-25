# == Schema Information
#
# Table name: chat_groups
#
#  id         :integer          not null, primary key
#  image      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChatGroup < ApplicationRecord
    has_many :members, dependent: :destroy
    has_many :users, through: :members
    has_many :messages, dependent: :destroy
    
    has_one_attached :image
  
    validates :name, presence: true
  
    def add_users(user_ids)
      users = User.where(id: user_ids)
      users.each do |user|
        self.members.create(user: user)
      end
    end
  
    def remove_users(user_ids)
      self.members.where(user_id: user_ids).destroy_all
    end
  end
