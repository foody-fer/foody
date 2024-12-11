class CreateProgressUpdates < ActiveRecord::Migration[6.0]
    def change
      create_table :progress_updates do |t|
        t.integer :image_id, index: true
        t.text :progress_info
  
        t.timestamps
      end
    end
  end
  