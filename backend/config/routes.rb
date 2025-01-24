Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  get "/", to: "root#index"

  get "/auth/google" => "oauth#google"
  get "/auth/google/callback" => "oauth#google_callback"
  get "/auth/github" => "oauth#github"
  get "/auth/github/callback" => "oauth#github_callback"

  namespace :api do
    namespace :v1 do
      resource :registrations, only: [ :create, :update ]
      resources :auth, only: [ :index, :create ]

      resources :posts, only: [ :index, :create, :show, :update, :destroy ] do
        resource :likes, controller: :posts_likes, only: [ :show, :create, :destroy ]
        resources :comments, controller: :posts_comments, only: [ :index, :create, :update, :destroy ]
      end

      resource :planner, controller: :planner_config, only: [ :show, :update ] do
        resources :week_plans, only: [ :index, :show, :create ] do
          post :regenerate

          resources :meals, controller: :planned_meals, only: [:index, :show, :update, :destroy] do
            post :regenerate
          end
        end
      end
    end
  end
end
