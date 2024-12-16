class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :username
      t.references :weekly_plan, null: false, foreign_key: true
      t.boolean :gender
      t.string :name
      t.string :surname
      t.string :contact
      t.string :email
      t.string :password

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
