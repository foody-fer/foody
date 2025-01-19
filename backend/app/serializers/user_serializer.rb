# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
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
class UserSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :username, :first_name, :last_name, :gender

  attribute :avatar do |user|
    image_url_for(user.avatar)
  end
end
