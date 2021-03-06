class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render :show
    else
      render json: { message: "Unable to save profile" }, status: 401
    end
  end

  def show
    if logged_in?
      @user = current_user
      render :show
    else
      render json: { message: "Not logged in" }, status: 401
    end
  end

  def update
    current_user.update!(user_params)
    @user = current_user
    render :show
  end



  private
  def user_params
    params.require(:user).permit(:name, :email, :zipcode, :password,
    :password_digest, :about_me, :about_life, :search_size, :search_sex,
    :search_age, :image, :session_token, :ideal_dog)
  end


end
