class OauthController < ApplicationController
  OAUTH_CONFIG = {
    google: {
      scope: "email profile",
      oauth_init_url: "https://accounts.google.com/o/oauth2/v2/auth",
      token_url: "https://oauth2.googleapis.com/token",
      user_info_url: "https://www.googleapis.com/oauth2/v2/userinfo",
      client_id: Rails.application.credentials.google[:client_id],
      client_secret: Rails.application.credentials.google[:client_secret],
      redirect_uri: "#{Rails.application.config.x.host_url}/auth/google/callback"
    },
    github: {
      scope: "user",
      oauth_init_url: "https://github.com/login/oauth/authorize",
      token_url: "https://github.com/login/oauth/access_token",
      user_info_url: "https://api.github.com/user",
      client_id: Rails.application.credentials.github[:client_id],
      client_secret: Rails.application.credentials.github[:client_secret],
      redirect_uri: "#{Rails.application.config.x.host_url}/auth/github/callback"
    }
  }

  class TokenError < StandardError; end

  def github
    if Rails.env.development? # && false
      render plain: "This is disabled in dev"
    else
      redirect_to oauth_init_url(provider: :github), allow_other_host: true
    end
  end

  def github_callback
    user_info = handle_callback(provider: :github)
    return if handle_login(user_info["email"])

    user_data = {
      username: user_info["login"],
      email: user_info["email"],
      first_name: user_info["name"].split(" ", 2).first,
      last_name: user_info["name"].split(" ", 2).last,
      avatar_url: user_info["avatar_url"]
    }

    redirect_to frontend_url("/sign-up", user_data), allow_other_host: true
  rescue TokenError
    redirect_to frontend_url("/auth-error"), allow_other_host: true
  end

  def google
    redirect_to oauth_init_url(provider: :google), allow_other_host: true
  end

  def google_callback
    user_info = handle_callback(provider: :google)
    return if handle_login(user_info["email"])

    user_data = {
      email: user_info["email"],
      first_name: user_info["given_name"],
      last_name: user_info["family_name"],
      avatar_url: user_info["picture"]
    }

    redirect_to frontend_url("/sign-up", user_data), allow_other_host: true
  rescue TokenError
    redirect_to frontend_url("/auth-error"), allow_other_host: true
  end

  private

  def handle_login(email)
    user = User.find_by(email: email)
    return unless user

    redirect_to frontend_url("/sign-in?#{{ token: user.jwt }.to_query}"), allow_other_host: true
    true
  end

  def handle_callback(provider:)
    config = OAUTH_CONFIG[provider]

    # Exchange code for tokens
    response = HTTP.post(
      config[:token_url],
      headers: { Accept: "application/json" },
      form: config.slice(:client_id, :client_secret, :redirect_uri).merge({ code: params[:code], grant_type: "authorization_code" })
    )

    raise TokenError unless response.status.success?

    token_data = JSON.parse(response.body.to_s)

    # Get user info using the access token
    user_info_response = HTTP.auth("Bearer #{token_data['access_token']}").get(config[:user_info_url])
    raise TokenError unless response.status.success?

    parsed = JSON.parse(user_info_response.body.to_s)
    raise TokenError if parsed["status"] == "401"

    parsed
  end

  def oauth_init_url(provider:)
    config = OAUTH_CONFIG[provider]
    query = config.slice(:client_id, :redirect_uri, :scope)
                  .merge({
                           response_type: "code",
                           access_type: "offline",
                           prompt: "consent",
                           state: { host: params[:host].presence }.to_json
                         })

    "#{config[:oauth_init_url]}?#{query.to_query}"
  end

  def frontend_url(path, query = {})
    "#{frontend_host}#{path}?#{query.to_query}"
  end

  def frontend_host
    url = Rails.application.config.x.frontend_url

    return url if params[:state].blank?

    JSON.parse(params[:state])["host"].presence || url
  rescue JSON::ParserError
    url
  end
end
