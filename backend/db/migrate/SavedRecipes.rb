class CreateSavedRecipes < ActiveRecord::Migration[6.0]
    def change
      create_table :saved_recipes do |t|
        t.integer :recipe_id, index: true
        t.integer :user_id, index: true
  
        t.timestamps
      end
      add_index :saved_recipes, [:recipe_id, :user_id], unique: true
    end
  end
  