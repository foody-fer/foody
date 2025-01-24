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
class PlannerConfig < ApplicationRecord
  belongs_to :user

  MEAL_TIMES = %w[breakfast morning_snack lunch afternoon_snack dinner]

  serialize :meal_time_config, coder: JSON
  serialize :goals, coder: JSON

  has_many :week_plans, dependent: :destroy
  has_many :planned_meals, through: :week_plans

  validates :goals, presence: true, length: { minimum: 1 }
  validates :base_prompt, presence: true
  validate :validate_meal_time_config

  private

  def validate_meal_time_config
    if meal_time_config.blank?
      return errors.add :meal_time_config, "is required"
    end

    unless meal_time_config.is_a?(Hash)
      return errors.add :meal_time_config, "must be a hash"
    end

    meal_time_config.each do |meal_time, meal|
      errors.add meal_time, "must be a boolean" unless meal.is_a?(TrueClass) || meal.is_a?(FalseClass)
    end
  end
end
