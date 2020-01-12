$(function() {
  $(document).on('click', '.js-taskUpdate', function() {
    // エラーメッセージが存在する場合は消す
    if ($('.alert-danger').length) {
      $('.alert-danger').remove();
    }

    let url = $(this).data('url');
    console.log("url");
    console.log(url);
    let taskId = $(this).data('task-id');
    let taskEditTitle = $(`#js-taskEditTitle-${taskId}`).val();
    let taskEditTweetContent = $(`#js-taskEditBody-${taskId}`).val();
    let taskEditRepeatInterval = $(`input[name="editRepeatInterval-${taskId}"]:checked`).val();
    let taskEditTweetDayOfWeek = $(`input[name="editTweetDayOfWeek-${taskId}"]:checked`).val();
    let taskEditTweetDateYear  = $(`#_js-tweet_date-${taskId}_1i`).val();
    let taskEditTweetDateMonth  = $(`#_js-tweet_date-${taskId}_2i`).val();
    let taskEditTweetDateDay  = $(`#_js-tweet_date-${taskId}_3i`).val();
    let taskEditTweetTimeHour  = $(`#_js-taskEditTweetTime-${taskId}_4i`).val();
    let taskEditTweetTimeMinute  = $(`#_js-taskEditTweetTime-${taskId}_5i`).val();

    console.log("111111111111111111");
    console.log(taskId);
    console.log(taskEditTitle);
    console.log(taskEditTweetContent);
    console.log(taskEditRepeatInterval);
    console.log(taskEditTweetDayOfWeek);
    console.log(taskEditTweetDateYear);
    console.log(taskEditTweetDateMonth);
    console.log(taskEditTweetDateDay);
    console.log(taskEditTweetTimeHour);
    console.log(taskEditTweetTimeMinute);

    $.ajax({
      url: url,
      type:'PUT',
      dataType: "json",
      data:{
        'task': {
          'title': taskEditTitle
          , 'tweet_content': taskEditTweetContent
          , 'repeat_interval': taskEditRepeatInterval
          , 'tweet_dayofweek': taskEditTweetDayOfWeek
          , 'tweet_date_year': taskEditTweetDateYear
          , 'tweet_date_month': taskEditTweetDateMonth
          , 'tweet_date_day': taskEditTweetDateDay
          , 'tweet_time_hour': taskEditTweetTimeHour
          , 'tweet_time_minute': taskEditTweetTimeMinute
        }
      }
    })
      .done( (data) => {
        if (taskEditTweetContent !== '') {
        $(`#js-taskTitle-${taskId}`).text(taskEditTitle);
        $(`#js-taskBody-${taskId}`).html(taskEditTweetContent.replace(/\r?\n/g, '<br>'));
        $(`#js-taskRepeatInterval-${taskId}`).text(taskEditRepeatInterval);
        $(`#js-taskTweetDateTime-${taskId}`).text(data['tweet_datetime']);
        $(`#js-taskEditForm-${taskId}`).css('display', 'none');
        }
      })
      .fail( (data) => {
        $(`#js-taskFailedFlash-${taskId}`).prepend(`<div class='alert alert-danger'>${data['responseJSON']['errors']['messages']}</div>`);
      })
    });
  });

