class TweetsController < ApplicationController

  def tweet
    client = set_twitter_user
    begin
      client.update!("This is test. (delete immediately)")
      redirect_to root_path
    rescue
      puts "失敗！！！！！！！！！！！"
      redirect_to root_path
    end
  end


  def set_twitter_user
    user = User.find(params[:user_id])
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.twitter[:api_key]
      config.consumer_secret     = Rails.application.credentials.twitter[:api_secret_key]
      config.access_token        = user.access_token
      config.access_token_secret = user.access_token_secret
    end
    return client
  end

end
