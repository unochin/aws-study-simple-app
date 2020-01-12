$(function() {
  console.log("change puase flag")
  $(document).on('click', '.js-taskFinish', function() {
    console.log("click")
    // エラーメッセージが存在する場合は消す
    if ($('.alert-danger').length) {
      $('.alert-danger').remove();
    }

    let url = $(this).data('url');
    let taskId = $(this).data('taskid');

    $.ajax({
      url: url,
      type:'PATCH',
      dataType: "json",
      data:{
        'task_id': taskId
      }
    })
      .done( (data) => {
        $(`#js-taskFinish-${taskId}`).remove();
        $(`#js-taskEdit-${taskId}`).remove();
        $(`.js-taskPause-${taskId}`).remove();
        $(`#js-taskCrudList-${taskId}`).prepend("<li class='list-inline-item'>完了済</li>");
      })
      .fail( (data) => {
        $(`#js-taskFailedFlash-${taskId}`).prepend(`<div class='alert alert-danger'>${data['responseJSON']['errors']['messages']}</div>`);
      })
    });
  });

