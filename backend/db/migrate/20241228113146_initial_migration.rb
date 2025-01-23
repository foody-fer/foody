# frozen_string_literal: true

class InitialMigration < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :gender, null: false
      t.string :password_digest, null: false
      t.timestamps

      t.index :username, unique: true
      t.index :email, unique: true
    end

    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :content, null: false
      t.integer :comments_count, null: false, default: 0
      t.integer :likes_count, null: false, default: 0
      t.integer :user_saved_posts_count, null: false, default: 0
      t.timestamps
    end

    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.index [ :user_id, :post_id ], unique: true
      t.timestamps
    end

    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.text :content, null: false
      t.timestamps
    end

    create_table :user_saved_posts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.index [ :user_id, :post_id ], unique: true
      t.timestamps
    end
  end
end
