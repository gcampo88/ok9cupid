class Api::UsersController < ApplicationController
  def create
    # debugger
    @user = User.new(create_params)
    if @user.save
      log_in!(@user)
      debugger
      render :show
    else
      render json: { message: "Unable to save profile" }, status: 401
    end
  end

  def show
    if logged_in?
      @user = current_user
      debugger
      render :show
    else
      render json: { message: "Not logged in" }, status: 401
    end
  end

  def update
    current_user.update!(user_params)
    render json: current_user
  end



  private
  def user_params
    params.require(:user).permit(:name, :email, :zipcode, :password,
    :password_digest, :about_me, :about_life, :ideal_dog,
    :search_size, :search_sex, :search_age, :image, :session_token)
  end

  def create_params
    params.require(:user).permit(:name, :email, :zipcode, :password)
  end
end
