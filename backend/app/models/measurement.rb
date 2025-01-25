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
class Measurement < ApplicationRecord
  belongs_to :user

  MEASUREMENT_TYPES = %w[weight waist thighs hips arms neck]

  enum :key, MEASUREMENT_TYPES.to_h { |key| [ key, key ] }

  validates :key, presence: true, inclusion: { in: MEASUREMENT_TYPES }
  validates :value, presence: true
end
