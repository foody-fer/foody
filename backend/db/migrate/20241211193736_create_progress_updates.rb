class CreateProgressUpdates < ActiveRecord::Migration[8.0]
  def change
    create_table :progress_updates do |t|
      t.references :image, null: false, foreign_key: true
      t.text :progress_info

      t.timestamps
    end
  end
end
