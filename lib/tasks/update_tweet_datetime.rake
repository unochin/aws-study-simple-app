namespace :update_tweet_datetime do
  desc 'tweet_datetimeカラムの日時を更新'
  task update_tweet_datetime: :environment do
    begin
      Task.find_each(&:update_tweet_datetime)
    rescue => e
      Rails.logger.error('NG!')
      raise e
    end
  end
end
