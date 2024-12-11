class CreateImages < ActiveRecord::Migration[6.0]
    def change
      create_table :images do |t|
        t.binary :image
        t.string :metadata, null: true
  
        t.timestamps
      end
    end
  end
  