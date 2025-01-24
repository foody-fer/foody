# == Schema Information
#
# Table name: planned_meals
#
#  id           :integer          not null, primary key
#  comment      :string
#  date         :datetime         not null
#  description  :string           not null
#  macros       :string           not null
#  meal_time    :string           not null
#  title        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  week_plan_id :integer          not null
#
# Indexes
#
#  index_planned_meals_on_week_plan_id  (week_plan_id)
#
# Foreign Keys
#
#  week_plan_id  (week_plan_id => week_plans.id)
#
class PlannedMeal < ApplicationRecord
  serialize :macros, coder: JSON

  belongs_to :week_plan

  has_one_attached :image

  def regenerate
    update(comment: nil, macros: {}, title: "Generating...", description: "")
    image.purge

    # GenerationJob.perform_later
  end
end
