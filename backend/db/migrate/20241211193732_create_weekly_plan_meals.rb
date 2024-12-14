class CreateWeeklyPlanMeals < ActiveRecord::Migration[8.0]
  def change
    create_table :weekly_plan_meals do |t|
      t.references :weekly_plan, null: false, foreign_key: true
      t.references :planned_meal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
