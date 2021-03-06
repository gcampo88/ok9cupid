Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api, defaults: { format: 'json'} do

    resources :favorites, only: [:create, :destroy, :show, :index]

    resources :users, only: [:update, :show, :new, :create] do
      get "splash", on: :collection
    end

    resource :session, only: [:show, :create, :destroy]

  end

  get "auth/facebook/callback", to: "omniauth#facebook"

end
