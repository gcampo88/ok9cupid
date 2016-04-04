class AllowNullZip < ActiveRecord::Migration
  def change
    change_column :users, :zipcode, :string, null:true 
  end
end
