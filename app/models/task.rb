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
end
