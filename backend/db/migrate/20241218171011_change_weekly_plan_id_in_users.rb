class ChangeWeeklyPlanIdInUsers < ActiveRecord::Migration[8.0]
  def change
    change_column :users, :weekly_plan_id, :integer, null: true
  end
end
