class CreateUsers < ActiveRecord::Migration[6.0]
    def change
      create_table :users do |t|
        t.string :username, null: false, unique: true
        t.string :name
        t.string :surname
        t.string :contact
        t.string :email, null: false, unique: true
        t.string :password, null: false
        t.boolean :gender
        t.integer :weekly_plan_id, foreign_key: true, null: true
        t.timestamps
      end
    end
  end
  