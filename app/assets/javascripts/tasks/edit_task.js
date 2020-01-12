$(function() {
  $(document).on('click', '.js-taskEdit', function() {
    let taskId = $(this).data('task-id');
    let taskEditForm = $(`#js-taskEditForm-${taskId}`);

    let taskEditTweetContentArea = $(`#js-taskEditBody-${taskId}`);
    let taskTweetContent = $(`#js-taskBody-${taskId}`).text();

    let taskEditTitleArea = $(`#js-taskEditTitle-${taskId}`);
    let taskTitle = $(`#js-taskTitle-${taskId}`).text();

    let taskEditTweetDateTimeArea = $(`#js-taskEditTweetDateTime-${taskId}`);
    let taskTweetDateTime = $(`#js-taskTweetDateTime-${taskId}`).text();

    let taskEditOneTimeRadioBtn = $(`#js-one_time-${taskId}`);
    let taskEditEveryDayRadioBtn = $(`#js-every_day-${taskId}`);
    let taskEditEveryWeekRadioBtn = $(`#js-every_week-${taskId}`);
    let taskRepeatInterval = $(`#js-taskRepeatInterval-${taskId}`).text();


    if (taskEditForm.css('display') === 'none') {
      taskEditForm.css('display', 'block')
      taskEditTitleArea.val(taskTitle)
      taskEditTweetContentArea.val(taskTweetContent)
      taskEditTweetDateTimeArea.val(taskTweetDateTime)

      if (taskRepeatInterval == 'one_time') {
        $(`input[name="editRepeatInterval-${taskId}"]`).val(['one_time']);
        $(`#js-taskEditTweetDayOfWeek-${taskId}`).css('display', 'none')
      } else if (taskRepeatInterval == 'every_day') {
        $(`input[name="editRepeatInterval-${taskId}"]`).val(['every_day']);
        $(`#js-taskEditTweetDate-${taskId}`).css('display', 'none')
        $(`#js-taskEditTweetDayOfWeek-${taskId}`).css('display', 'none')
      } else if (taskRepeatInterval == 'every_week') {
        $(`input[name="editRepeatInterval-${taskId}"]`).val(['every_week']);
        $(`#js-taskEditTweetDate-${taskId}`).css('display', 'none')
        let wday = $(`#js-taskTweetDayOfWeek-${taskId}`).text();
        $(`input[name=editTweetDayOfWeek-${taskId}]`).val([wday]);
      }
    } else {
      taskEditForm.css('display', 'none');
    }
  });

  $(document).on('click', '.js-oneTimeRadioBtn', function() {
    let oneTimeRadioBtnId = $(this).data('task-id');
    $(`input[name="editRepeatInterval-${oneTimeRadioBtnId}"]`).val(['one_time']);
    $(`#js-taskEditTweetDate-${oneTimeRadioBtnId}`).css('display', 'block')
    $(`#js-taskEditTweetDayOfWeek-${oneTimeRadioBtnId}`).css('display', 'none')
  });
  $(document).on('click', '.js-everyDayRadioBtn', function() {
    let everyDayRadioBtnId = $(this).data('task-id');
    $(`input[name="editRepeatInterval-${everyDayRadioBtnId}"]`).val(['every_day']);
    $(`#js-taskEditTweetDate-${everyDayRadioBtnId}`).css('display', 'none')
    $(`#js-taskEditTweetDayOfWeek-${everyDayRadioBtnId}`).css('display', 'none')
  });
  $(document).on('click', '.js-everyWeekRadioBtn', function() {
    let everyWeekRadioBtnId = $(this).data('task-id');
    $(`input[name="editRepeatInterval-${everyWeekRadioBtnId}"]`).val(['every_week']);
    $(`#js-taskEditTweetDate-${everyWeekRadioBtnId}`).css('display', 'none')
    $(`#js-taskEditTweetDayOfWeek-${everyWeekRadioBtnId}`).css('display', 'block')
  });

  $(document).on('click', '.js-taskEditCancel', function() {
    let taskId = $(this).data('task-id');
    let taskEditForm = $(`#js-taskEditForm-${taskId}`);
    taskEditForm.css('display', 'none');
    if ($('.alert-danger').length) {
      $('.alert-danger').remove();
    }
  });
});
