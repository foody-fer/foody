class CreateWeeklyPlans < ActiveRecord::Migration[8.0]
  def change
    create_table :weekly_plans do |t|
      t.timestamps
    end
  end
end
