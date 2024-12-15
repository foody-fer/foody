class CreateFoodPosts < ActiveRecord::Migration[8.0]
  def change
    create_table :food_posts do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :post_date_time
      t.string :post_text
      t.references :recipe, null: false, foreign_key: true
      t.references :planned_meal, null: false, foreign_key: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
