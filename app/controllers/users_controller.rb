class UsersController < ApplicationController
  def splash
    render :splash
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to root_url
      return
    else
      flash.now[:messages] = @user.errors.full_messages
      render :new
      return
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :zipcode, :password, :password_digest, :about_me, :about_life, :ideal_dog, :search_size, :search_sex, :search_age, :image, :session_token)
  end

end
