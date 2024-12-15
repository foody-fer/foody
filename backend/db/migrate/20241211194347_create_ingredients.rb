class CreateIngredients < ActiveRecord::Migration[8.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.integer :default_measurement_unit
      t.float :calories_per_default_measure

      t.timestamps
    end
  end
end
