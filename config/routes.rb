Rails.application.routes.draw do
  post 'search/find'
  resources :photos
  require 'sidekiq/web'
  mount Sidekiq::Web => "/sidekiq" 
  post 'photos/destroy_all', to: 'photos#destroy_all'
  post 'photos/find', to: 'photos#find'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
