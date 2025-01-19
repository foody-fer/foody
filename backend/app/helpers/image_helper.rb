module ImageHelper
  include Rails.application.routes.url_helpers

  def image_url_for(image)
    return nil if image.blank?

    url_for(image)
  end

  private

  def default_url_options
    if Rails.env.development?
      { host: 'localhost', port: 3000 }
    else
      { host: 'foody-backend.zeko.run' }
    end
  end
end
