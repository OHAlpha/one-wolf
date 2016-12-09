Rails.application.routes.draw do
  
  get 'navigation/news'

  get 'navigation/gallery'

  get 'navigation/games'

  get 'navigation/subscribe'

  get 'navigation/comming_soon'

  root 'navigation#home'
  get '/home', to: 'navigation#home'
  get '/about', to: 'navigation#about'
  get '/contact', to: 'navigation#contact'
  get '/links', to: 'navigation#links'
  get '/join', to: 'navigation#join'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
