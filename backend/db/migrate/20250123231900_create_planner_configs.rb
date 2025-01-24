class CreatePlannerConfigs < ActiveRecord::Migration[8.0]
  def change
    create_table :planner_configs do |t|
      t.integer :user_id, null: false
      t.string :goals, null: false
      t.string :base_prompt, null: false
      t.string :meal_time_config, null: false

      t.timestamps

      t.index :user_id, unique: true
      t.foreign_key :users, column: :user_id
    end

    create_table :week_plans do |t|
      t.date :monday, null: false
      t.belongs_to :planner_config, null: false, foreign_key: true
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    create_table :planned_meals do |t|
      t.belongs_to :week_plan, null: false, foreign_key: true

      t.datetime :date, null: false
      t.string :meal_time, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.string :macros, null: false
      t.string :comment

      t.timestamps
    end
  end
end
