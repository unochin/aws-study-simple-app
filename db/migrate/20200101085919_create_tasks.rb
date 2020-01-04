class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.boolean :repeat_flag, null: false, default: false
      t.datetime :next_deadline
      t.datetime :repeat_deadline
      t.text :tweet_content, null: false
      t.integer :status, null: false, default: 0
      t.boolean :pause_flag, null: false, default: false
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
