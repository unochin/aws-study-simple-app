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

  // リピートチェックボックス変更時
  $('input[name="task[repeat_flag]"]').change(function() {
    if ($('#task_repeat_flag').prop('checked') == true) {
      $('#js-nextDeadlineDisplay').css('display', 'none')
      $('#js-repeatDeadlineDisplay').css('display', 'block')
    } else {
      $('#js-nextDeadlineDisplay').css('display', 'block')
      $('#js-repeatDeadlineDisplay').css('display', 'none')
    }
  })

  // タスクの期限の間隔のラジオボタン変更時
  $('input[name="interval"]').change(function() {
    console.log('change radio');
    if ($('input[name="interval"]:checked').val() === 'day') {
      $('#dayInterval').css('display', 'block');
      $('#weekInterval').css('display', 'none');
      $('#monthInterval').css('display', 'none');
    } else if ($('input[name="interval"]:checked').val() === 'week') {
      $('#dayInterval').css('display', 'none');
      $('#weekInterval').css('display', 'block');
      $('#monthInterval').css('display', 'none');
    } else if ($('input[name="interval"]:checked').val() === 'month') {
      $('#dayInterval').css('display', 'none');
      $('#weekInterval').css('display', 'none');
      $('#monthInterval').css('display', 'block');
    }
  })
});
