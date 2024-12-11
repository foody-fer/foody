class CreateSavedRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :saved_recipes do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
