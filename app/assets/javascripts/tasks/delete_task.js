$(function() {
  $(document).on('click', '.js-taskDelete', function() {
    // エラーメッセージが存在する場合は消す
    if ($('.alert-danger').length) {
      $('.alert-danger').remove();
    }
    let url = $(this).data('url');
    let taskId = $(this).data('taskid');

    $.ajax({
      url: url,
      type:'DELETE',
      dataType: "json",
      data:{
        'task_id': taskId
      }
    })
      .done( (data) => {
        $(`#js-task-${taskId}`).remove();
      })
      .fail( (data) => {
        $(`#js-taskFailedFlash-${taskId}`).prepend(`<div class='alert alert-danger'>${data['responseJSON']['errors']['messages']}</div>`);
      })
  })
});
