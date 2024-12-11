class CreateChatGroupMembers < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_group_members do |t|
      t.references :chat_group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end