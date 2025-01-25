# == Schema Information
#
# Table name: measurements
#
#  id          :integer          not null, primary key
#  key         :string
#  recorded_at :datetime
#  value       :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_measurements_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class MeasurementSerializer
  include Alba::Resource

  attributes :id, :key, :value, :recorded_at
end
