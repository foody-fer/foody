class CreateWeeklyPlanMeals < ActiveRecord::Migration[6.0]
    def change
      create_table :weekly_plan_meals do |t|
        t.integer :weekly_plan_id, index: true
        t.integer :planned_meal_id, index: true
  
        t.timestamps
      end
    end
  end
  