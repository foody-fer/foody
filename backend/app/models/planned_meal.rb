class PlannedMeal < ApplicationRecord
  belongs_to :image
  belongs_to :recipe
end
