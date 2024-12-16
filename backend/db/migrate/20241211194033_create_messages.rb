class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: true
      t.string :message_text
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
