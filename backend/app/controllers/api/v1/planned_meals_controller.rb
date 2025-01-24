module Api::V1
  class PlannedMealsController < ApiController
    before_action :set_week_plan
    before_action :set_planned_meal, only: [:show, :update, :destroy, :regenerate]

    def index
      render json: PlannedMealSerializer.new(@week_plan.planned_meals)
    end

    def show
      render json: PlannedMealSerializer.new(@planned_meal)
    end

    def update
      if @planned_meal.update(planned_meal_params)
        render json: PlannedMealSerializer.new(@planned_meal)
      else
        render json: { errors: format_errors(@planned_meal) }, status: :unprocessable_entity
      end
    end

    def destroy
      if @planned_meal.destroy
        render json: { message: "Planned meal deleted" }
      else
        render json: { errors: format_errors(@planned_meal) }, status: :unprocessable_entity
      end
    end

    def regenerate
      @planned_meal.regenerate
      render json: { ok: true }
    end

    private

    def set_week_plan
      @week_plan = Current.user.week_plans.find(params[:week_plan_id])
    end

    def set_planned_meal
      @planned_meal = @week_plan.planned_meals.find(params[:id])
    end

    def planned_meal_params
      params.require(:planned_meal).permit(:comment)
    end
  end
end
