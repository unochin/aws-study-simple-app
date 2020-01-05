class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.datetime :tweet_datetime
      t.date :tweet_date
      t.time :tweet_time
      t.integer :repeat_interval, null: false, default: 0
      t.integer :tweet_dayofweek
      t.text :tweet_content, null: false
      t.integer :status, null: false, default: 0
      t.boolean :pause_flag, null: false, default: false
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
