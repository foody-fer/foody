# == Schema Information
#
# Table name: planner_configs
#
#  id               :integer          not null, primary key
#  base_prompt      :string           not null
#  goals            :string           not null
#  meal_time_config :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer          not null
#
# Indexes
#
#  index_planner_configs_on_user_id  (user_id) UNIQUE
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class PlannerConfigSerializer
  include Alba::Resource
  include ImageHelper

  attributes :id, :base_prompt, :goals

  attribute :meal_time_config do |config|
    PlannerConfig::MEAL_TIMES.to_h do |meal_time|
      [ meal_time, config.meal_time_config[meal_time] || false ]
    end
  end
end
