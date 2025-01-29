class CreateMeasurements < ActiveRecord::Migration[8.0]
  def change
    create_table :measurements do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :key
      t.float :value
      t.timestamp :recorded_at

      t.timestamps
    end
  end
end
