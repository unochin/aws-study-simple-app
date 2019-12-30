Rails.application.routes.draw do
  root to: 'static_pages#home'

  resources :users

  post 'logout' => 'oauths#destroy', :as => :logout

  # get  'static_pages/home'
  get  'static_pages/about'
  get 'oauths/oauth'
  get 'oauths/callback'
  resources :posts

  resource :user
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
