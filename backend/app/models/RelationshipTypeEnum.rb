class UserRelationship < ApplicationRecord
    enum relationship_type: {
      follow: 0,
      friend: 1,
      request: 2
    }
  end
  