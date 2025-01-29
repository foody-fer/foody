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

      get "saved_posts", to: "saved_posts#index"

      resources :measurements, only: [ :index, :create, :destroy ]

      resources :posts, only: [ :index, :create, :show, :update, :destroy ] do
        resource :likes, controller: :posts_likes, only: [ :show, :create, :destroy ]
        resources :comments, controller: :posts_comments, only: [ :index, :create, :update, :destroy ]

        resource :saves, controller: :saved_posts, only: [ :show, :create, :destroy ]
      end

      resources :chat_groups, only: [:index, :create, :show, :update, :destroy] do 
        resources :messages, only: [:index, :create, :destroy]
        resources :members, only: [:index, :create, :destroy]
      end

      resources :users, only: [:index]
    end
  end
end
