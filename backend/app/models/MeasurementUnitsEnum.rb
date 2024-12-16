class Ingredient < ApplicationRecord
    enum default_measurement_unit: {
      gram: 0,
      kilogram: 1,
      milliliter: 2,
      liter: 3,
      teaspoon: 4,
      tablespoon: 5,
      cup: 6,
      piece: 7,
      pinch: 8,
      dash: 9,
      ounce: 10,
      pound: 11
    }
  end
  