class RootController < ApplicationController
  def index
    render plain: "Hello there"
  end

  def sandbox
    render json: GenerateMealJob.perform_later(time_of_day: "breakfast", week_plan: WeekPlan.first)
  rescue StandardError => e
    render json: e
  end
end
