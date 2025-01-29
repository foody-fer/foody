class WeekPlanGeneratorJob < ApplicationJob
  queue_as :default

  def perform(week_plan)
    week_plan.update!(status: :in_progress)
    7.times { |day| generate_day(week_plan, day: day) }
    week_plan.update!(status: :generated)
  rescue StandardError => e
    puts 'ERROR_GENERATING_WEEK_PLAN'
    puts e.backtrace

    week_plan.update!(status: :failed)
  end

  private

  def generate_day(week_plan, day:)
    week_plan.planner_config.meal_time_config.each do |time_of_day, enabled|
      next unless enabled

      GenerateMealJob.perform_now(time_of_day: time_of_day, week_plan: week_plan, day: day)
    end
  end
end
