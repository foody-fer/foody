class CreateChatGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_groups do |t|
      t.boolean :is_dm

      t.timestamps
    end
  end
end
