class CreateRecipes < ActiveRecord::Migration[6.0]
    def change
      create_table :recipes do |t|
        t.integer :author_id, index: true
        t.text :recipe_text
  
        t.timestamps
      end
    end
  end
  