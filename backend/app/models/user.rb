# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  bio             :string
#  email           :string           not null
#  first_name      :string           not null
#  gender          :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  phone           :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email     (email) UNIQUE
#  index_users_on_username  (username) UNIQUE
#

class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar

  has_many :posts, dependent: :destroy
  has_many :user_saved_posts, dependent: :destroy
  has_many :saved_posts, through: :user_saved_posts, source: :post

  has_one :planner_config, dependent: :destroy
  has_many :week_plans, through: :planner_config, class_name: "WeekPlan"
  has_many :planned_meals, through: :week_plans, class_name: "PlannedMeal"

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :chat_group_memberships, dependent: :destroy, class_name: "Member"
  has_many :chat_groups, through: :chat_group_memberships

  has_many :measurements, -> { order(recorded_at: :desc) }, dependent: :destroy

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid" }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, presence: true, inclusion: { in: %w[male female] }
  validates :phone, presence: true

  enum :gender, { male: "male", female: "female" }

  def jwt
    JWT.encode({ user_id: id }, Rails.application.credentials.secret_key_base, "HS256")
  end

  def name
    "#{first_name} #{last_name}"
  end
end
