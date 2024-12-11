class CreateMeasurementUnits < ActiveRecord::Migration[6.0]
    def change
      create_table :measurement_units do |t|
        t.string :unit_name
  
        t.timestamps
      end
    end
  end
  