Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api, defaults: { format: 'json'} do
    resources :users, only: [:update, :show]
  end

  resources :users, only: [:new, :create] do
    get "splash", on: :collection
  end
  resource :session, only: [:new, :create, :destroy]

end
