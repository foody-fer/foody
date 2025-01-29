class FixRecordedAt < ActiveRecord::Migration[8.0]
  def change
    add_column :measurements, :recorded_at_tmp, :date
    Measurement.all.each do |measurement|
      measurement.update_column(:recorded_at_tmp, measurement.recorded_at)
    end

    remove_column :measurements, :recorded_at
    rename_column :measurements, :recorded_at_tmp, :recorded_at
  end
end
