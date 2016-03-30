class Api::UsersController < ApplicationController
  def show
    if current_user
      @user = current_user
      render :show
    else
      render :nothing => true, :status => 422
    end
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  def update
    # debugger
    @user = User.find(params[:id].to_i)
    @user.update!(user_params)
    render :show
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
