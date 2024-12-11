class CreatePlannedMeals < ActiveRecord::Migration[6.0]
    def change
      create_table :planned_meals do |t|
        t.integer :image_id, index: true, null: true
        t.integer :recipe_id, index: true
  
        t.timestamps
      end
    end
  end
  