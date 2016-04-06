class Favorite < ActiveRecord::Base

belongs_to :user
validates :user_id, :dog_id, presence: true



end
