class Task < ApplicationRecord
  belongs_to :user

  enum repeat_interval: { one_time: 0, every_day: 1, every_week: 2 }
  enum tweet_dayofweek: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
  enum pause_flag: { active: 0, pause: 1 }
  enum pause_flag: { todo: 0, done: 1 }

  validates :title, presence: true
  validates :tweet_content, presence: true
  validates :status, presence: true
  validates :pause_flag, presence: true

  def toggle_pause_flag!
    if active?
      pause!
    else
      active!
    end
  end

  def update_tweet_datetime
    if tweet_datetime < Time.current
      # 指定日時・時刻を文字列で取得
      today = Time.current.to_date.to_s
      tweet_time = tweet_time.to_s.split[1]
      today_tweet_datetime = (today + ' ' + tweet_time).in_time_zone
      if every_day?
        tweet_datetime = (Date.tomorrow.to_s + ' ' + tweet_time).in_time_zone
      elsif task.every_week?
        # 次の指定曜日の日付を取得
        next_wday = Time.current.beginning_of_week(task.tweet_dayofweek.to_sym).since(1.week)
        task.tweet_datetime = (next_wday.to_date.to_s + ' ' + tweet_time).in_time_zone
      end
    end
  end
end
