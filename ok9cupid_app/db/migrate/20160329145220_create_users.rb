class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null:false
      t.integer :zipcode, null:false
      t.string :email, null:false
      t.text :about_me
      t.text :about_life
      t.text :ideal_dog
      t.text :search_size
      t.text :search_sex
      t.integer :search_age
      t.string :password_digest, null: false
      t.string :session_token, null:false

      t.timestamps

    end
    add_index(:users, :email)
    add_index(:users, :session_token)
  end
end
