class CreateUserRelationships < ActiveRecord::Migration[6.0]
    def change
      create_table :user_relationships do |t|
        t.integer :user_id, index: true
        t.integer :related_user_id, index: true
        t.string :relationship_type
  
        t.timestamps
      end
    end
  end
  