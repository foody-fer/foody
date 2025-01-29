# == Schema Information
#
# Table name: chat_groups
#
#  id         :integer          not null, primary key
#  is_dm      :boolean
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChatGroup < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :users, through: :members
  has_many :messages, -> { order(created_at: :desc) }, dependent: :destroy
  
  has_one_attached :image

  validates :name, presence: true, unless: :is_dm
  validate :only_two_members, if: :is_dm
  validate :only_one_dm, if: :is_dm

  scope :dm, -> { where(is_dm: true) }

  def other_user
    return unless is_dm

    members.where.not(user_id: Current.user.id).first
  end

  private

  def only_two_members
    errors.add(:base, "DM must have exactly two members") if members.size != 2
  end

  def only_one_dm
    chat_groups = ChatGroup.dm
    chat_groups.each do |chat_group|
      if chat_group.members.pluck(:user_id).sort == members.map(&:user_id).sort
        return errors.add(:base, "DM already exists")
      end
    end
  end
end
