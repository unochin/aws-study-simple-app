class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @tasks = @user.tasks
    @task = Task.new
  end

end
