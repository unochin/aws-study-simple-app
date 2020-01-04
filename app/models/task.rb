class Task < ApplicationRecord
  belongs_to :user

  enum repeat_flag: { no_repeat: false, repeat: true }
  enum pause_flag: { active: false, pause: true }

  validates :title, presence: true
  validates :repeat_flag, presence: true
  validates :tweet_content, presence: true
  validates :status, presence: true
  validates :pause_flag, presence: true
end
