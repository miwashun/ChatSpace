Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: %i[edit update]
  resources :groups, only: %i[ new create edit update] do
  end
end
