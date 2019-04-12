Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :users, only: %i[edit update]
  resources :groups, only: %i[index new create edit update] do
  end
end
