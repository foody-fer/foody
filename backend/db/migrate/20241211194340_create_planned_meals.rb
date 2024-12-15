class CreatePlannedMeals < ActiveRecord::Migration[8.0]
  def change
    create_table :planned_meals do |t|
      t.references :image, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
