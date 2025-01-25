module ImageHelper
  include Rails.application.routes.url_helpers

  def image_url_for(image)
    Rails.logger.debug("image_url_for called with: #{image.inspect}")
    return nil if image.blank?

    url_for(image)
  end

  private

  def default_url_options
    Rails.application.config.action_mailer.default_url_options
  end
end
