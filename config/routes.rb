
Rails.application.routes.draw do


  resources :datatables, only: [:index, :create, :destroy, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root 'home#index'
  namespace :api do 
    namespace :v1 do 
      resources :datatables, only: [:index, :create, :destroy, :update]
  #   resources :articles, only: [:index, :create, :destroy, :update]
    end 
  end 
end