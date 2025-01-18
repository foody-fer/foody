class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar

  has_many :posts, dependent: :destroy
  has_many :user_saved_posts, dependent: :destroy
  has_many :saved_posts, through: :user_saved_posts, source: :post

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid" }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, presence: true

  enum :gender, { male: "male", female: "female" }
end
