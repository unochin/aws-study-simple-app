$(function() {
  console.log("change puase flag")
  $(document).on('click', '.js-taskPause', function() {
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
        // $(`#js-taskCrudMenus-${taskId}`).remove();

      })
      .fail( (data) => {
        //$(`#js-taskFailedFlash-${taskId}`).prepend(`<div class='alert alert-danger'>${data['responseJSON']['errors']['messages']}</div>`);
      })
    });
  });

