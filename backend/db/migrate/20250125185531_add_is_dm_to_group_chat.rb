class AddIsDmToGroupChat < ActiveRecord::Migration[8.0]
  def change
    add_column :chat_groups, :is_dm, :boolean, default: false
    remove_column :chat_groups, :image
  end
end
