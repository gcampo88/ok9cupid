class ChangeUsers < ActiveRecord::Migration
  def change
    change_column(:users, :search_age, :string)
  end
end
