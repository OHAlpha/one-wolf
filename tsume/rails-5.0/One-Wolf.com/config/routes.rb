Rails.application.routes.draw do
  get '/test1', to: 'navigation#test1'
  get '/test2', to: 'navigation#test2'

  root 'navigation#home'
  get '/home', to: 'navigation#home'
  get '/about', to: 'navigation#about'
  get '/contact', to: 'navigation#contact'
  get '/links', to: 'navigation#links'
  get '/join', to: 'navigation#join'
  get '/news', to: 'navigation#news'
  get '/gallery', to: 'navigation#gallery'
  get '/games', to: 'navigation#games'
  get '/subscribe', to: 'navigation#subscribe'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
