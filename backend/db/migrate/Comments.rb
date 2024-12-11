class CreateComments < ActiveRecord::Migration[6.0]
    def change
      create_table :comments do |t|
        t.string :comment_text
        t.integer :user_id, index: true
        t.integer :post_id, index: true
        t.datetime :created_at
  
        t.timestamps
      end
    end
  end
  