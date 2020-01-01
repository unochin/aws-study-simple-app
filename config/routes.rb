Rails.application.routes.draw do
  root to: 'static_pages#home'

  resources :users
  resources :tasks

  post 'logout' => 'oauths#destroy', :as => :logout

  get  'static_pages/about'
  resources :posts

  resource :user
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider
  get "tweet/:user_id" => "tweets#tweet", :as => :tweet

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
