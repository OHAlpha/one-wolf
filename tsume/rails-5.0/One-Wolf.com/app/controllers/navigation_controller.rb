class NavigationController < ApplicationController
  
  layout :resolve_layout
  
  def home
  end

  def about
  end

  def contact
    render :comming_soon
  end

  def links
    render :comming_soon
  end

  def join
    render :comming_soon
  end

  def news
    render :comming_soon
  end

  def gallery
    render :comming_soon
  end

  def games
    render :comming_soon
  end

  def subscribe
    render :comming_soon
  end
  

  def comming_soon
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
