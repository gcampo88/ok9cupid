class AddFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :dog_id
      t.string :dog_photo
      t.string :dog_name

      t.timestamps
    end
  end
end
