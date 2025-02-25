class GenerateMealJob < ApplicationJob
  BASE_PROMPT = <<~PROMPT
    You're a helpful assistant that generates meal plans for a given meal in the dal
    A user will give you their goals and preferences, and you will generate a meal plan for them.
    The meal should include a name, description, and all the macros (in grams) + calories in kcal.
    You should also include any relevant information about the user's dietary restrictions or preferences in description.
    Format meal as JSON.
  PROMPT

  JSON_SCHEMA = {
    type: :object,
    properties: {
      title: { type: :string },
      description: { type: :string },
      macros: {
        type: :object,
        additionalProperties: false,
        properties: {
          protein: { type: :integer },
          carbs: { type: :integer },
          fat: { type: :integer },
          calories: { type: :integer },
        },
        required: [:protein, :carbs, :fat, :calories]
      }
    },
    additionalProperties: false,
    required: [:title, :description, :macros]
  }

  def perform(meal: nil, time_of_day:, week_plan:, day:)
    response = client.chat(
      parameters: {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "developer",
            content: BASE_PROMPT
          },
          {
            role: "user",
            content: "My preferences are: #{week_plan.planner_config.base_prompt}\n\nAnd my goals are: #{week_plan.planner_config.goals.join(', ')}"
          },
          {
            role: "user",
            content: "Generate a meal plan for #{time_of_day}"
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'one_meal_plan',
            strict: true,
            schema: JSON_SCHEMA
          }
        }
      }
    )

    res = JSON.parse(response['choices'].first['message']['content'])
    image = client.images.generate(
      parameters: {
        model: "dall-e-3",
        size: '1024x1024',
        prompt: "A photo of '#{res['title']}' with '#{res['description']}'",
        quality: 'standard',
      }
    )

    img_url = image.dig("data", 0, "url")

    if meal.present?
      meal.update!(
        title: res['title'],
        description: res['description'],
        macros: res['macros']
      )
    else
      meal = week_plan.planned_meals.create!(
        date: week_plan.monday + day.days,
        title: res['title'],
        meal_time: time_of_day,
        description: res['description'],
        macros: res['macros']
      )
    end

    meal.image.attach(io: URI.open(img_url), filename: "image.png", content_type: "image/png")
  end

  private

  def client
    @client ||= OpenAI::Client.new
  end
end
