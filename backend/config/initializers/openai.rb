OpenAI.configure do |config|
  config.access_token = Rails.application.credentials.open_ai
  config.log_errors = true
end
