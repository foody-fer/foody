class CreateMessages < ActiveRecord::Migration[6.0]
    def change
      create_table :messages do |t|
        t.integer :sender_id, index: true
        t.string :message_text
        t.integer :image_id, index: true, null: true
  
        t.timestamps
      end
    end
  end
  