namespace :tweet do
  desc '期限が過ぎた未完了のタスクのサボったツイート'
  task tweet: :environment do
    current_datetime = Time.current.strftime("%Y-%m-%d %H:%M:00")
    begin
      Task.find_each do |tsk|
        tweet_datetime = tsk.tweet_datetime.strftime("%Y-%m-%d %H:%M:00")
        if current_datetime == tweet_datetime
          tsk.tweet
        end
      end
    rescue => e
      Rails.logger.error('NG!!')
      raise e
    end
  end
end
