class User < ApplicationRecord
  belongs_to :weekly_plan, optional: true
  validates :name, presence: true
  validates :surname, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :contact, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid" }
end
