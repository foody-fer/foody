class CreateLikes < ActiveRecord::Migration[6.0]
    def change
      create_table :likes do |t|
        t.integer :user_id, index: true
        t.integer :post_id, index: true
        t.datetime :created_at
  
        t.timestamps
      end
    end
  end
  