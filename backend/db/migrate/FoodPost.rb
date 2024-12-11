class CreateFoodPosts < ActiveRecord::Migration[6.0]
    def change
      create_table :food_posts do |t|
        t.integer :user_id, index: true
        t.datetime :post_date_time
        t.string :post_text
        t.integer :recipe_id, index: true, null: true
        t.integer :planned_meal_id, index: true, null: true
        t.integer :image_id, index: true, null: true
  
        t.timestamps
      end
    end
  end
  