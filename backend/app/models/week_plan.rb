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
class WeekPlan < ApplicationRecord
  belongs_to :planner_config

  has_many :planned_meals, dependent: :destroy

  enum :status, { pending: 0, in_progress: 1, generated: 2, failed: 3 }
  validates :monday, presence: true, uniqueness: :planner_config_id

  normalizes :monday, with: -> (date) { date.to_date.beginning_of_week(:monday) }
end
