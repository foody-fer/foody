module Api::V1
  class PlannerConfigController < ApiController
    def show
      if planner.persisted?
        render json: PlannerConfigSerializer.new(planner).to_json
      else
        render json: { error: "Planner config not found" }, status: :not_found
      end
    end

    def update
      if planner.update(planner_config_params)
        render json: PlannerConfigSerializer.new(planner).to_json
      else
        render json: { errors: format_errors(planner) }, status: :unprocessable_entity
      end
    end

    private

    def planner
      @planner ||= PlannerConfig.find_or_initialize_by(user: Current.user)
    end

    def planner_config_params
      params.require(:planner_config).permit(:base_prompt, goals: [], meal_time_config: {})
    end
  end
end
