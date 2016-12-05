Rails.application.routes.draw do
  
  root 'navigation#home'
  get '/home', to: 'navigation#home'
  get '/about', to: 'navigation#about'
  get '/contact', to: 'navigation#contact'
  get '/links', to: 'navigation#links'
  get '/join', to: 'navigation#join'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
