class FoodPost < ApplicationRecord
  belongs_to :user
  belongs_to :recipe
  belongs_to :planned_meal
  belongs_to :image
end
