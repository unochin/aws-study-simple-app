class AddAccessTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :access_token, :string, after: :name
    add_column :users, :access_token_secret, :string, after: :access_token
  end
end
