class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.references :author, null: false, foreign_key: true
      t.text :recipe_text

      t.timestamps
    end
  end
end
