class CreateSavedPosts < ActiveRecord::Migration[6.0]
    def change
      create_table :saved_posts do |t|
        t.integer :user_id, index: true
        t.integer :post_id, index: true
        t.datetime :created_at
  
        t.timestamps
      end
      add_index :saved_posts, [:user_id, :post_id], unique: true
    end
  end
  