class TasksController < ApplicationController

  def new
    @task = Task.new
  end

  def create
    @task = current_user.tasks.build(task_params)
    if @task.save
      redirect_to user_path(@task.user)
    else
      # render user_path(@task.user)
      render template: 'users/show'
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
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

  def task_params
    params.require(:task).permit(:title, :repeat_flag, :next_deadline, :repeat_deadline, :tweet_content, :status, :pause_flag, :use_id)
  end
end
