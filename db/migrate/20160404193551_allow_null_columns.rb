class AllowNullColumns < ActiveRecord::Migration
  def change
    change_column :users, :password_digest, :string, null:true
  end
end
