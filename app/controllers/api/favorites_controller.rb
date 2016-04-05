class Api::FavoritesController < ApplicationController

  def index
    render json: Favorite.all
  end

  def create
    favorite = current_user.favorites.create!(favorite_params)
    render json: favorite
  end

  def destroy
    favorite = Favorite.find(params[:id])
    favorite.destroy!
    render json: favorite
  end


  private
  def favorite_params
    params.require(:favorite).permit(:user_id, :dog_id, :dog_photo, :dog_name)
  end

end
