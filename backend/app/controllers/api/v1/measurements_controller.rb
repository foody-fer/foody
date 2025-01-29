module Api::V1
  class MeasurementsController < ApiController
    def index
      render json: MeasurementSerializer.new(Current.user.measurements), status: :ok
    end

    def create
      @measurement = Current.user.measurements.new(create_measurement_params)

      if @measurement.save
        render json: MeasurementSerializer.new(@measurement), status: :created
      else
        render json: { errors: format_errors(@measurement) }, status: :unprocessable_entity
      end
    end

    def destroy
      @measurement = Current.user.measurements.find(params[:id])

      if @measurement.destroy
        render json: { message: "Measurement deleted" }, status: :ok
      else
        render json: { errors: format_errors(@measurement) }, status: :unprocessable_entity
      end
    end

    private

    def create_measurement_params
      params.require(:measurement).permit(:key, :value, :recorded_at)
    end
  end
end
