require 'test_helper'

class NavigationControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get navigation_home_url
    assert_response :success
  end

  test "should get about" do
    get navigation_about_url
    assert_response :success
  end

  test "should get contact" do
    get navigation_contact_url
    assert_response :success
  end

  test "should get links" do
    get navigation_links_url
    assert_response :success
  end

  test "should get join" do
    get navigation_join_url
    assert_response :success
  end

end
