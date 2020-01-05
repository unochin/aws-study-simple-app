$(function() {
  // タスク新規作成ボタン押下
  $('#js-newTaskBtn').click(function() {
   $('#newTaskForm').css('display', 'block')
  })

  // タスク新規作成フォームでキャンセルボタン押下時
  $('#js-cancelNewTaskBtn').click(function() {
    $('#task_title').val('');
    $('#task_tweet_content').val('');
    $('#task_repeat_flag').prop('checked', false);
   $('#newTaskForm').css('display', 'none')
  })

  // リピート間隔のラジオボタン変更時
  $('input[name="task[repeat_interval]"]').change(function() {
    console.log($('input[name="task[repeat_interval]"]:checked').val())
    if ($('input[name="task[repeat_interval]"]:checked').val() === 'one_time') {
      $('#js-tweetDate').css('display', 'block');
      $('#weekInterval').css('display', 'none');
    } else if ($('input[name="task[repeat_interval]"]:checked').val() === 'every_day') {
      $('#js-tweetDate').css('display', 'none');
      $('#weekInterval').css('display', 'none');
    } else if ($('input[name="task[repeat_interval]"]:checked').val() === 'every_week') {
      $('#js-tweetDate').css('display', 'none');
      $('#weekInterval').css('display', 'block');
    }
  })
});
