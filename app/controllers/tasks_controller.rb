class TasksController < ApplicationController

  def new
    @task = Task.new
  end

  def create
    @task = current_user.tasks.build(task_params)
    set_tweet_datetime(@task)
    if @task.save
      redirect_to user_path(@task.user)
    else
      # render user_path(@task.user)
      # render template: 'users/show'
      redirect_to user_path(@task.user)
    end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    tweet_year = params[:task][:tweet_date_year] || '1999'
    tweet_month = params[:task][:tweet_date_month] || '01'
    tweet_day = params[:task][:tweet_date_day] || '01'
    tweet_hour = params[:task][:tweet_time_hour] || '01'
    tweet_minute = params[:task][:tweet_time_minute] || '01'
    time = Time.zone.parse("#{tweet_year}-#{tweet_month}-#{tweet_day} #{tweet_hour}:#{tweet_minute}:00")

  puts 'params確認======================'
  puts params[:task][:title]
  puts params[:task][:repeat_interval]
  puts params[:task][:tweet_dayofweek] == nil
  puts params[:task][:tweet_content]



    @task.tweet_date = time
    puts 'tweet_date'
    puts @task.tweet_date
    @task.tweet_time = time
    puts 'tweet_time'
    puts @task.tweet_time
    @task.title = params[:task][:title]
    @task.repeat_interval = params[:task][:repeat_interval]
    @task.tweet_dayofweek = params[:task][:tweet_dayofweek]
    @task.tweet_content = params[:task][:tweet_content]
    set_tweet_datetime(@task)
    if @task.save
      render json: { tweet_datetime: @task.tweet_datetime.strftime('%Y-%m-%d %H:%M') }, status: :ok
    else
      puts "error===================================="
      render json: { task: @task, errors: { messages: @task.errors.full_messages } }, status: :bad_request
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:task_id])
    task_title = @task.title
    if @task.destroy
      render json: { task_title: task_title  }
    else
      render json: { task: @task, errors: { messages: @task.errors.full_messages  } }, status: :bad_request
    end
  end

  def toggle_pause_flag
    @task = current_user.tasks.find(params[:task_id])
    if @task.toggle_pause_flag!
      render json: { task: @task }, status: :ok
      # render partial: 'tasks/crud_menus', locals: { task: @task }
    else
      render json: { task: @task }
    end
  end

  def task_params
    params.require(:task).permit(:title, :repeat_interval, :tweet_date, :tweet_time, :tweet_dayofweek, :tweet_content, :pause_flag, :user_id)
  end

  def task_update_params
    params.require(:task).permit(:title, :tweet_content, :repeat_interval, :tweet_date, :tweet_time, :tweet_month, )
  end

  # 直近のツイート日時を作成
  def set_tweet_datetime(task)
    wday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    # 指定時刻を文字列で取得
    tweet_time = task.tweet_time.to_s.split[1]
    today = Time.current.to_date.to_s
    today_tweet_datetime = (today + ' ' + tweet_time).in_time_zone
    if task.one_time?
      tweet_datetime = task.tweet_date.to_s + ' ' + tweet_time
      task.tweet_datetime = tweet_datetime.in_time_zone
      task.tweet_dayofweek = nil
    elsif task.every_day?
      if today_tweet_datetime > Time.current
        task.tweet_datetime = today_tweet_datetime
      else
        task.tweet_datetime = (Date.tomorrow.to_s + ' ' + tweet_time).in_time_zone
      end
      task.tweet_date = nil
      task.tweet_dayofweek = nil
    elsif task.every_week?
      # タスク新規作成日が指定曜日かつ現在時刻が指定時刻より未来の場合
      if (task.tweet_dayofweek == wday[Time.current.wday]) && (today_tweet_datetime > Time.current)
        task.tweet_datetime = today_tweet_datetime
      else
        # 次の指定曜日の日付を取得
        next_wday = Time.current.beginning_of_week(task.tweet_dayofweek.to_sym).since(1.week)
        task.tweet_datetime = (next_wday.to_date.to_s + ' ' + tweet_time).in_time_zone
      end
      task.tweet_date = nil
    end
  end

end
