class UserRelationship < ApplicationRecord
  belongs_to :user
  belongs_to :related_user
end
