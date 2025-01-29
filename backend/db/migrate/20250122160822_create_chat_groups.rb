class CreateChatGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_groups do |t|
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
