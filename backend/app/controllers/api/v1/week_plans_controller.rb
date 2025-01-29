module Api::V1
  class WeekPlansController < ApiController
    before_action :set_week_plan, only: [ :show, :regenerate ]

    def index
      render json: WeekPlanSerializer.new(Current.user.week_plans)
    end

    def show
      render json: WeekPlanSerializer.new(@week_plan)
    end

    def create
      week_plan = Current.user.planner_config.week_plans.new(week_plan_params)

      if week_plan.save
        WeekPlanGeneratorJob.perform_later(week_plan)

        render json: WeekPlanSerializer.new(week_plan)
      else
        render json: week_plan.errors, status: :unprocessable_entity
      end
    end

    def regenerate
      @week_plan.planned_meals.destroy_all
      @week_plan.update(status: :pending)

      WeekPlanGeneratorJob.perform_later(@week_plan)

      render json: WeekPlanSerializer.new(@week_plan)
    end

    private

    def week_plan_params
      params.require(:week_plan).permit(:monday)
    end

    def set_week_plan
      @week_plan = if params[:week_monday].present?
                     Current.user.week_plans.find_by!(monday: params[:week_monday])
                   else
                     Current.user.week_plans.find(params[:week_plan_id] || params[:id])
                   end
    end
  end
end
