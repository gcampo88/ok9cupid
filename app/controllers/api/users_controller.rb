class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
  end
  #
  # def destroy
  #   @user = User.find(params[:id])
  #   @user.destroy
  #   redirect_to new_session_url
  # end

  private
  def user_params
    params.require(:user).permit(:name, :email, :zipcode, :password, :password_digest, :about_me, :about_life, :ideal_dog, :search_size, :search_sex, :search_age, :session_token)
  end
end
