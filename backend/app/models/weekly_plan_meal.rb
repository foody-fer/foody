class WeeklyPlanMeal < ApplicationRecord
  belongs_to :weekly_plan
  belongs_to :planned_meal
end
