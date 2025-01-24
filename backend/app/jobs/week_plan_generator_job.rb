class WeekPlanGeneratorJob < ApplicationJob
  queue_as :default

  def perform(week_plan)
    week_plan.update!(status: :in_progress)
    7.times { |day| generate_day(week_plan, day: day) }
    week_plan.update!(status: :generated)
  rescue StandardError => e
    p e

    week_plan.update!(status: :failed)
  end

  private

  def generate_day(week_plan, day:)
    week_plan.planner_config.meal_time_config.each do |time_of_day, enabled|
      next unless enabled

      week_plan.planned_meals.create!(
        date: week_plan.monday + day.days,
        title: "#{time_of_day} generate",
        meal_time: time_of_day,
        description: "asd",
        macros: {}
      )

      sleep 5
    end
  end
end
