class NavigationController < ApplicationController
  
  layout :resolve_layout
  
  def home
  end

  def about
  end

  def contact
  end

  def links
  end

  def join
  end
  
  private

  def resolve_layout
    case action_name
    when "home"
      "home"
    else
      "application"
    end
  end
  
end
