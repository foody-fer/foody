class CreateUserRelationships < ActiveRecord::Migration[8.0]
  def change
    create_table :user_relationships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :related_user, null: false, foreign_key: true
      t.integer :relationship_type

      t.timestamps
    end
  end
end
