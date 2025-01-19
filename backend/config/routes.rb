Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  get "/", to: "root#index"

  namespace :api do
    namespace :v1 do
      resources :registrations, only: [:create, :update]
      resources :auth, only: [:index, :create]

      resources :posts, only: [:index, :create, :show, :update, :destroy] do
        resource :likes, controller: :posts_likes, only: [:show, :create, :destroy]
        resources :comments, controller: :posts_comments, only: [:index, :create, :update, :destroy]
      end
    end
  end
end

