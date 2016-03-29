class SessionsController < ApplicationController

  def new

  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:messages] = ["Invalid credentials"]
      render :new
    end

  end

  def destroy
    log_out!
    redirect_to new_session_url

  end

  private
  def session_params
    params.require(:user).permit(:email, :password)
  end


end
