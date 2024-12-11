class CreateRecipeIngredients < ActiveRecord::Migration[6.0]
    def change
      create_table :recipe_ingredients do |t|
        t.integer :recipe_id, index: true
        t.integer :ingredient_id, index: true
        t.string :measurement_unit
        t.float :quantity
  
        t.timestamps
      end
    end
  end
  