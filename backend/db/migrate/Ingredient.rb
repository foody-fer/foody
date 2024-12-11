class CreateIngredients < ActiveRecord::Migration[6.0]
    def change
      create_table :ingredients do |t|
        t.string :name
        t.string :default_measurement_unit
        t.float :calories_per_default_measurement
  
        t.timestamps
      end
    end
  end
  