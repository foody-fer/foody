class CreateChatGroupMembers < ActiveRecord::Migration[6.0]
    def change
      create_table :chat_group_members do |t|
        t.integer :chat_group_id, index: true
        t.integer :user_id, index: true
  
        t.timestamps
      end
    end
  end
  