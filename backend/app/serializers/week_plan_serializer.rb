# == Schema Information
#
# Table name: week_plans
#
#  id                :integer          not null, primary key
#  monday            :date             not null
#  status            :integer          default("pending"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  planner_config_id :integer          not null
#
# Indexes
#
#  index_week_plans_on_planner_config_id  (planner_config_id)
#
# Foreign Keys
#
#  planner_config_id  (planner_config_id => planner_configs.id)
#
class WeekPlanSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :monday, :status

  STATE_TO_PROGRESS_MAP = { "pending" => 0, "failed" => -1, "generated" => 1 }

  attribute :progress do |week_plan|
    STATE_TO_PROGRESS_MAP[week_plan.status].presence || (
      week_plan.planned_meals.count.to_f / (week_plan.planner_config.meal_time_config.values.compact.count * 7)
    )
  end
end
